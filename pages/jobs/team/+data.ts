import { fetchTeams } from "../../../lib/airtable";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const teams = await fetchTeams();

  return {
    teams,
  };
}
