import { useState } from "react";
import { useData } from "vike-react/useData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronRight, Filter, Check, Users } from "lucide-react";
import type { Data } from "./+data";

export default function Page() {
  const { jobsByCategory, jobsByProject, projects } = useData<Data>();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Get all jobs from all categories
  const allJobs = Object.values(jobsByCategory)
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter jobs by selected project
  const filteredJobs = selectedProject
    ? allJobs.filter((job) => (job.project || "General") === selectedProject)
    : allJobs;

  // Get project info by identifier
  const getProjectInfo = (identifier: string) => {
    return projects.find((p) => p.identifier === identifier || p.name === identifier);
  };

  // Get unique project identifiers from jobs
  const projectsWithJobs = Object.keys(jobsByProject).sort((a, b) => {
    if (a === "General") return 1;
    if (b === "General") return -1;
    return a.localeCompare(b);
  });

  const selectedProjectInfo = selectedProject ? getProjectInfo(selectedProject) : null;

  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/images/logo.webp" alt="Sahaj Web Projects Logo" />
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sahaj Web Volunteering</h1>
          <p className="text-muted-foreground">Help us build a strong digital campaign to spread Sahaja Yoga</p>
        </div>
      </div>

      {/* About Section */}
      <div className="prose prose-sm max-w-none space-y-4">
        <p className="text-foreground/80">
          Many yogis volunteer for{" "}
          <a href="https://wemeditate.com" target="_blank" rel="noopener noreferrer">
            We Meditate
          </a>{" "}
          and its <a href="/">related projects</a> , but there&apos;s much more than we can manage alone!
        </p>
        <ul className="space-y-2 text-foreground/80 list-disc pl-5">
          <li>
            If you&apos;re ready to take responsibility to make part of this project successful, please get in touch.
            Enthusiasm is as important as skill.
          </li>
          <li>
            If you need resume-worthy work, look no further. You&apos;re being given meaningful responsibility and a
            great opportunity to develop skills.
          </li>
        </ul>
        <Button asChild variant="outline" className="gap-2">
          <a href="/jobs/team">
            <Users className="h-4 w-4" />
            Meet Our Current Team
          </a>
        </Button>
      </div>

      {/* Jobs Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Job Dashboard </h2>

          {/* Filter Dropdown */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {selectedProject ? (
                  <span className="flex items-center gap-2">
                    {selectedProjectInfo?.icon && (
                      <img src={selectedProjectInfo.icon} alt="" className="h-4 w-4 rounded object-cover" />
                    )}
                    {selectedProjectInfo?.name || selectedProject}
                  </span>
                ) : (
                  "Filter by project"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setFilterOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent cursor-pointer ${
                    selectedProject === null ? "bg-accent" : ""
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {selectedProject === null && <Check className="h-4 w-4" />}
                  </div>
                  <span>All Projects</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {allJobs.length}
                  </Badge>
                </button>
                {projectsWithJobs.map((projectKey) => {
                  const projectInfo = getProjectInfo(projectKey);
                  const jobCount = jobsByProject[projectKey]?.length || 0;
                  const isSelected = selectedProject === projectKey;

                  return (
                    <button
                      key={projectKey}
                      onClick={() => {
                        setSelectedProject(projectKey);
                        setFilterOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent cursor-pointer ${
                        isSelected ? "bg-accent" : ""
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {isSelected && <Check className="h-4 w-4" />}
                      </div>
                      {projectInfo?.icon ? (
                        <img src={projectInfo.icon} alt="" className="h-5 w-5 rounded object-cover" />
                      ) : (
                        <div className="h-5 w-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold">
                          {projectKey.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="flex-1 text-left">{projectInfo?.name || projectKey}</span>
                      <Badge variant="secondary" className="text-xs">
                        {jobCount}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none px-4 py-3 cursor-pointer"
            >
              All Jobs ({filteredJobs.length})
            </TabsTrigger>
            {Object.keys(jobsByCategory).map((category) => {
              const categoryJobs = selectedProject
                ? jobsByCategory[category].filter((job) => (job.project || "General") === selectedProject)
                : jobsByCategory[category];
              return (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none shadow-none px-4 py-3 cursor-pointer"
                >
                  {category} ({categoryJobs.length})
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* All Jobs Tab - List View */}
          <TabsContent value="all" className="mt-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-lg">
                No jobs found for this project.
              </div>
            ) : (
              <div className="border rounded-lg divide-y">
                {filteredJobs.map((job) => {
                  const projectInfo = job.project ? getProjectInfo(job.project) : null;
                  return (
                    <a
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
                    >
                      {/* Project Logo */}
                      <Avatar className="h-10 w-10 shrink-0">
                        {projectInfo?.icon ? (
                          <AvatarImage src={projectInfo.icon} alt={projectInfo.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                            {(job.project || "G").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground">{job.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                          <span>{job.category}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <span>{projectInfo?.name || job.project || "General"}</span>
                          {job.priority && (
                            <>
                              <span className="text-muted-foreground/50">|</span>
                              <span className={job.priority === "Critical" ? "text-destructive" : ""}>
                                {job.priority} Priority
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Priority Badge & Arrow */}
                      <div className="flex items-center gap-3 shrink-0">
                        {job.priority && (
                          <Badge
                            variant="outline"
                            className={
                              job.priority === "Critical" || job.priority === "High"
                                ? "border-red-600 bg-red-600 text-white"
                                : job.priority === "Medium"
                                  ? "border-amber-600 bg-amber-600 text-white"
                                  : "border-teal-600 bg-teal-600 text-white"
                            }
                          >
                            {job.priority}
                          </Badge>
                        )}
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Job Category Tabs - List View */}
          {Object.entries(jobsByCategory).map(([category, jobs]) => {
            const categoryJobs = selectedProject
              ? jobs.filter((job) => (job.project || "General") === selectedProject)
              : jobs;

            return (
              <TabsContent key={category} value={category.toLowerCase()} className="mt-4">
                {category.toLowerCase() === "development" && (
                  <p className="text-sm text-muted-foreground mb-4">
                    For most of these technical roles we expect that you have some prior skills.
                  </p>
                )}
                {categoryJobs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground border rounded-lg">
                    No {category.toLowerCase()} jobs found for this project.
                  </div>
                ) : (
                  <div className="border rounded-lg divide-y">
                    {categoryJobs
                      .sort((a, b) => (a.priority || "z").localeCompare(b.priority || "z"))
                      .map((job) => {
                        const projectInfo = job.project ? getProjectInfo(job.project) : null;
                        return (
                          <a
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
                          >
                            {/* Project Logo */}
                            <Avatar className="h-10 w-10 shrink-0">
                              {projectInfo?.icon ? (
                                <AvatarImage src={projectInfo.icon} alt={projectInfo.name} />
                              ) : (
                                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                                  {(job.project || "G").charAt(0).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>

                            {/* Job Info */}
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground">{job.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                                <span>{job.category}</span>
                                <span className="text-muted-foreground/50">|</span>
                                <span>{projectInfo?.name || job.project || "General"}</span>
                                {job.priority && (
                                  <>
                                    <span className="text-muted-foreground/50">|</span>
                                    <span className={job.priority === "Critical" ? "text-destructive" : ""}>
                                      {job.priority} Priority
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Priority Badge & Arrow */}
                            <div className="flex items-center gap-3 shrink-0">
                              {job.priority && (
                                <Badge
                                  variant="outline"
                                  className={
                                    job.priority === "Critical" || job.priority === "High"
                                      ? "border-red-600 bg-red-600 text-white"
                                      : job.priority === "Medium"
                                        ? "border-amber-600 bg-amber-600 text-white"
                                        : "border-teal-600 bg-teal-600 text-white"
                                  }
                                >
                                  {job.priority}
                                </Badge>
                              )}
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </a>
                        );
                      })}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}
