import type { Job, Project, Person, Expense, Teams } from "../types/airtable";

// Use Cloudflare's native fetch API for Airtable (compatible with Workers)
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

async function airtableFetch(
  tableName: string,
  options: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: "asc" | "desc" }>;
  } = {},
): Promise<AirtableRecord[]> {
  const apiKey = import.meta.env.AIRTABLE_KEY as string;
  const baseId = import.meta.env.AIRTABLE_BASE as string;

  if (!apiKey || !baseId) {
    throw new Error("Airtable credentials not configured. Check AIRTABLE_KEY and AIRTABLE_BASE in .env.local");
  }

  const params = new URLSearchParams();
  if (options.filterByFormula) {
    params.append("filterByFormula", options.filterByFormula);
  }
  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field);
      params.append(`sort[${i}][direction]`, s.direction);
    });
  }

  const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}?${params}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airtable API error: ${response.status} ${errorText}`);
  }

  const data: AirtableResponse = await response.json();
  return data.records;
}

async function airtableFindRecord(tableName: string, recordId: string): Promise<AirtableRecord> {
  const apiKey = import.meta.env.AIRTABLE_KEY as string;
  const baseId = import.meta.env.AIRTABLE_BASE as string;

  if (!apiKey || !baseId) {
    throw new Error("Airtable credentials not configured. Check AIRTABLE_KEY and AIRTABLE_BASE in .env.local");
  }

  const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airtable API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

const COLORS = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink"];

/**
 * Maps project identifiers to their local image paths
 */
function getProjectIconPath(identifier: string): string {
  const iconMap: Record<string, string> = {
    wemeditate: "/images/wemeditate/logo.webp",
    atlas: "/images/sahaj-atlas/logo.webp",
    app: "/images/mobile-app/logo.svg",
    resources: "/images/resources/logo.webp",
    journey: "/images/journey-self-discovery/logo.png",
  };

  return iconMap[identifier] || "";
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    console.log("Fetching jobs from Airtable...");
    const records = await airtableFetch("Jobs", {
      filterByFormula: "Public = 1",
      sort: [{ field: "Category", direction: "asc" }],
    });

    console.log(`Fetched ${records.length} jobs`);
    return records.map((r) => ({
      id: r.id,
      name: r.fields.Name as string,
      category: r.fields.Category as string,
      brief: r.fields.Brief as string,
      description: r.fields.Description as string,
      icon: r.fields.Icon as string,
      priority: r.fields.Priority as string | undefined,
      project: r.fields.Project as string | undefined,
      public: true,
    }));
  } catch (error) {
    console.error("Error fetching jobs from Airtable:", error);
    return [];
  }
}

export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const record = await airtableFindRecord("Jobs", id);
    return {
      id: record.id,
      name: record.fields.Name as string,
      category: record.fields.Category as string,
      brief: record.fields.Brief as string,
      description: record.fields.Description as string,
      icon: record.fields.Icon as string,
      priority: record.fields.Priority as string | undefined,
      public: record.fields.Public as boolean,
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    console.log("Fetching projects from Airtable...");
    const projectRecords = await airtableFetch("Projects", {
      filterByFormula: "Type = 'Internal'",
      sort: [{ field: "Monthly", direction: "desc" }],
    });

    console.log(`Fetched ${projectRecords.length} projects`);
    const projects = await Promise.all(
      projectRecords.map(async (project) => {
        const expenseIds = project.fields.Expenses as string[] | undefined;
        let expenses: Expense[] = [];

        if (expenseIds?.length) {
          const expenseRecords = await airtableFetch("Expenses", {
            filterByFormula: `FIND(RECORD_ID(), "${expenseIds.join(",")}")`,
            sort: [{ field: "Monthly", direction: "desc" }],
          });

          expenses = expenseRecords.map((r) => ({
            name: r.fields.Name as string,
            description: r.fields.Description as string,
            type: r.fields.Type as "Monthly" | "Yearly",
            monthly: (r.fields.Monthly as number) || 0,
            yearly: (r.fields.Yearly as number) || 0,
          }));
        }

        // Map project identifier to local icon path
        const identifier = project.fields.Identifier as string;
        const localIconPath = getProjectIconPath(identifier);

        return {
          id: project.id,
          name: project.fields.Name as string,
          identifier,
          description: project.fields.Description as string,
          url: project.fields.URL as string,
          icon: localIconPath,
          monthly: (project.fields.Monthly as number) || 0,
          expenses,
        };
      }),
    );

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Airtable:", error);
    return [];
  }
}

export async function fetchTeams(): Promise<Teams> {
  const records = await airtableFetch("People", {
    filterByFormula: "Public = 1",
    sort: [{ field: "Teams", direction: "asc" }],
  });

  const teams: Teams = {};

  records.forEach((r, i) => {
    const teamsList = r.fields.Teams as string[];
    const name = r.fields.Name as string;
    const nameParts = name.split(" ");

    const person: Person = {
      name: nameParts.map((n, idx) => (idx > 0 ? n[0] : n)).join(" "),
      initials: nameParts.map((n) => n[0]).join(""),
      country: r.fields.Country as string,
      shortCountry: r.fields["Short Country"] as string,
      teams: teamsList,
      color: COLORS[i % 10],
    };

    teamsList.forEach((team) => {
      if (!teams[team]) teams[team] = [];
      teams[team].push(person);
    });
  });

  // Sort people within each team
  Object.keys(teams).forEach((team) => {
    teams[team].sort((a, b) => a.name.localeCompare(b.name));
  });

  return teams;
}
