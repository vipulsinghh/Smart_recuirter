import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusSquare, Users, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CompanyDashboardPage() {
  // Mock data
  const activeDrives = [
    { id: 1, title: "Software Engineer Intern 2024", applicants: 120, status: "Open" },
    { id: 2, title: "Marketing Specialist (Entry Level)", applicants: 75, status: "Interviewing" },
  ];

  const applicantStats = {
    totalReceived: 350,
    shortlisted: 80,
    pendingReview: 45,
  };

  return (
    <>
      <PageHeader title="Company Dashboard" description="Manage your recruitment drives and applicants." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" asChild>
              <Link href="/company/post-drive">
                <PlusSquare className="mr-2 h-4 w-4" /> Post New Job Drive
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/company/applicants">
                <Users className="mr-2 h-4 w-4" /> View All Applicants
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Drives</CardTitle>
             <Button variant="ghost" size="sm" asChild>
              <Link href="/company/drives">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {activeDrives.length > 0 ? (
              <ul className="space-y-3">
                {activeDrives.map(drive => (
                  <li key={drive.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div>
                      <p className="font-semibold text-foreground">{drive.title}</p>
                      <p className="text-sm text-muted-foreground">{drive.applicants} Applicants | Status: <span className={`font-medium ${drive.status === "Open" ? "text-green-600" : "text-yellow-600"}`}>{drive.status}</span></p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/company/drives/${drive.id}`}>Manage</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <Image src="https://placehold.co/300x200.png?text=No+Active+Drives" alt="No active drives" width={300} height={200} className="mx-auto rounded-md" data-ai-hint="empty state document" />
                <p className="mt-2 text-muted-foreground">You have no active job drives.</p>
                <Button className="mt-4" asChild>
                  <Link href="/company/post-drive">Post a Drive</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-accent" /> Applicant Statistics
          </CardTitle>
          <CardDescription>Overview of applicants across all drives.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-primary/10 rounded-md">
              <p className="text-3xl font-bold text-primary">{applicantStats.totalReceived}</p>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-accent/10 rounded-md">
              <p className="text-3xl font-bold text-accent">{applicantStats.shortlisted}</p>
              <p className="text-sm text-muted-foreground">Total Shortlisted</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-yellow-500/10 rounded-md">
              <p className="text-3xl font-bold text-yellow-600">{applicantStats.pendingReview}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
        </CardContent>
      </Card>
    </>
  );
}

// Placeholder pages for navigation items
export const PostDrivePage = () => <PageHeader title="Post Job Drive" />;
export const ApplicantsPage = () => <PageHeader title="Manage Applicants" />;
export const CompanyProfilePage = () => <PageHeader title="Company Profile" />;
