import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Eye, Trash2, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock application data
const applications = [
  { id: "app1", driveId: "1", companyName: "Tech Solutions Inc.", role: "Software Engineer Intern", dateApplied: "2024-07-16", status: "Applied" as const },
  { id: "app2", driveId: "2", companyName: "Innovatech Ltd.", role: "Data Analyst", dateApplied: "2024-07-12", status: "Shortlisted" as const },
  { id: "app3", driveId: "xyz", companyName: "Future Corp", role: "AI Researcher", dateApplied: "2024-07-10", status: "Interview Scheduled" as const },
  { id: "app4", driveId: "abc", companyName: "Biz Dev Co", role: "Sales Executive", dateApplied: "2024-06-20", status: "Offer Extended" as const },
  { id: "app5", driveId: "pqr", companyName: "Old Systems", role: "System Admin", dateApplied: "2024-06-15", status: "Not Selected" as const },
];

const getStatusVariant = (status: typeof applications[number]['status']) => {
  switch (status) {
    case "Applied": return "secondary";
    case "Shortlisted": return "default"; // primary
    case "Interview Scheduled": return "outline"; // Using outline for a distinct look, could be yellow
    case "Offer Extended": return "default"; // Could be green, but default for primary positive
    case "Not Selected": return "destructive";
    default: return "secondary";
  }
};

export default function StudentApplicationsPage() {
  return (
    <>
      <PageHeader title="My Applications" description="Track the status of your job applications." />
      
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-primary">{app.role}</CardTitle>
                  <CardDescription className="text-md text-foreground">{app.companyName}</CardDescription>
                </div>
                <Badge variant={getStatusVariant(app.status)} className="whitespace-nowrap">{app.status}</Badge>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-0">
                <div className="text-sm text-muted-foreground">
                  Applied on: {app.dateApplied}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/student/drives/${app.driveId}`}>
                      <Briefcase className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">View Drive</span>
                    </Link>
                  </Button>
                  {app.status === "Interview Scheduled" && (
                     <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90">
                        <Link href={`/student/applications/${app.id}/interview`}>
                            <MessageSquare className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Interview Details</span>
                        </Link>
                    </Button>
                  )}
                   {app.status === "Offer Extended" && (
                     <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Eye className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">View Offer</span>
                    </Button>
                  )}
                  {(app.status === "Applied" || app.status === "Shortlisted") && (
                    <Button variant="destructive" size="sm" className="bg-red-700/15 text-red-700 hover:bg-red-700/25">
                        <Trash2 className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Withdraw</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <Image src="https://placehold.co/400x300.png?text=No+Applications+Yet" alt="No applications" width={400} height={300} className="mx-auto rounded-lg shadow-md mb-6" data-ai-hint="empty state file" />
          <h2 className="text-2xl font-semibold text-foreground">You haven&apos;t applied to any drives yet.</h2>
          <p className="mt-2 text-muted-foreground">Start exploring placement drives and apply to kickstart your career!</p>
          <Button className="mt-6" asChild>
            <Link href="/student/drives">
              <Briefcase className="mr-2 h-4 w-4" /> Explore Drives
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
