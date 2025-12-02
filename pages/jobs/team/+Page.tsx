import { useData } from "vike-react/useData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Wrench, Pencil, Newspaper, Smartphone, Video, Share2, ArrowLeft, Globe, Users } from "lucide-react";
import type { Data } from "./+data";

// Map team names to Lucide icons
const getTeamIcon = (teamName: string) => {
  const teamLower = teamName.toLowerCase();
  if (teamLower === "technical") return Wrench;
  if (teamLower === "past writers") return Pencil;
  if (teamLower === "editorial") return Newspaper;
  if (teamLower === "app development") return Smartphone;
  if (teamLower === "live meditations") return Video;
  if (teamLower === "social media") return Share2;
  return Users;
};

// Map team colors
const getTeamColor = (teamName: string) => {
  const teamLower = teamName.toLowerCase();
  if (teamLower === "technical") return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  if (teamLower === "editorial") return "bg-purple-500/10 text-purple-600 border-purple-500/20";
  if (teamLower === "app development") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  if (teamLower === "social media") return "bg-pink-500/10 text-pink-600 border-pink-500/20";
  if (teamLower === "live meditations") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-slate-500/10 text-slate-600 border-slate-500/20";
};

export default function Page() {
  const { teams } = useData<Data>();

  // Get total volunteer count
  const allPeople = new Set<string>();
  Object.values(teams).forEach((members) => {
    members.forEach((person) => allPeople.add(person.name));
  });
  const totalVolunteers = allPeople.size;

  // Sort teams alphabetically
  const sortedTeams = Object.entries(teams).sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <a href="/jobs">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </a>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Our Volunteer Team</h1>
            <p className="text-muted-foreground">
              {totalVolunteers} dedicated volunteers across {sortedTeams.length} teams
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground/80">
          Our global team of volunteers work together to build and maintain digital tools that help spread Sahaja Yoga
          meditation around the world. Each team focuses on different aspects of our projects, from technical
          development to content creation and community engagement.
        </p>
      </div>

      <Separator />

      {/* Teams Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sortedTeams.map(([teamName, members]) => {
          const TeamIcon = getTeamIcon(teamName);
          const colorClasses = getTeamColor(teamName);

          return (
            <Card key={teamName} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClasses}`}>
                    <TeamIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{teamName}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {members.map((person, i) => (
                    <div
                      key={`${person.name}-${i}`}
                      className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback
                          className="text-[10px] font-medium"
                          style={{
                            backgroundColor: `var(--${person.color}-100, #e0e0e0)`,
                            color: `var(--${person.color}-700, #333)`,
                          }}
                        >
                          {person.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{person.name.split(" ")[0]}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {person.shortCountry}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      {/* Join CTA */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6 text-center space-y-4">
          <h2 className="text-xl font-bold">Want to Join Our Team?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We&apos;re always looking for passionate volunteers to help with our projects. Whether you&apos;re a
            developer, writer, designer, or just enthusiastic about spreading meditation, there&apos;s a place for you.
          </p>
          <Button asChild size="lg">
            <a href="/jobs">View Open Positions</a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
