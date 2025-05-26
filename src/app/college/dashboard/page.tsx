import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Building, MessageSquare, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CollegeDashboardPage() {
  // Mock data
  const stats = {
    activeDrives: 15,
    registeredStudents: 450,
    participatingCompanies: 50,
    unreadMessages: 3,
  };

  const recentActivities = [
    { id: 1, text: "New drive posted by Tech Solutions Inc.", type: "drive", time: "2 hours ago" },
    { id: 2, text: "25 new students registered this week.", type: "student", time: "1 day ago" },
    { id: 3, text: "Message received from Innovatech Ltd.", type: "message", time: "3 days ago" },
  ];

  return (
    <>
      <PageHeader title="College Dashboard" description="Manage all placement activities and communications." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.activeDrives}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
             <Button variant="link" size="sm" className="p-0 mt-2 h-auto" asChild>
              <Link href="/college/drives">Manage Drives <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.registeredStudents}</div>
            <p className="text-xs text-muted-foreground">+50 since last semester</p>
             <Button variant="link" size="sm" className="p-0 mt-2 h-auto" asChild>
              <Link href="/college/students">Manage Students <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participating Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.participatingCompanies}</div>
            <p className="text-xs text-muted-foreground">+5 new this year</p>
             <Button variant="link" size="sm" className="p-0 mt-2 h-auto" asChild>
              <Link href="/college/companies">Manage Companies <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">From students & companies</p>
             <Button variant="link" size="sm" className="p-0 mt-2 h-auto" asChild>
              <Link href="/college/communications">View Messages <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button asChild><Link href="/college/drives/new"><PlusCircle className="mr-2 h-4 w-4" /> Add New Drive</Link></Button>
            <Button asChild><Link href="/college/students/register"><GraduationCap className="mr-2 h-4 w-4" /> Register Student</Link></Button>
            <Button asChild><Link href="/college/companies/add"><Building className="mr-2 h-4 w-4" /> Add Company</Link></Button>
            <Button asChild><Link href="/college/communications/new"><MessageSquare className="mr-2 h-4 w-4" /> Send Announcement</Link></Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <ul className="space-y-3">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="flex items-start p-3 bg-secondary/50 rounded-md">
                    {activity.type === 'drive' && <Briefcase className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />}
                    {activity.type === 'student' && <GraduationCap className="h-5 w-5 mr-3 mt-1 text-green-600 flex-shrink-0" />}
                    {activity.type === 'message' && <MessageSquare className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />}
                    <div>
                      <p className="text-sm text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                 <Image src="https://placehold.co/300x200.png?text=No+Recent+Activity" alt="No recent activity" width={300} height={200} className="mx-auto rounded-md" data-ai-hint="empty state list" />
                <p className="mt-2 text-muted-foreground">No recent activities to display.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Placeholder pages for navigation items
export const ManageDrivesPage = () => <PageHeader title="Manage Drives" />;
export const ManageStudentsPage = () => <PageHeader title="Manage Students" />;
export const ManageCompaniesPage = () => <PageHeader title="Manage Companies" />;
export const CommunicationsPage = () => <PageHeader title="Communications" />;
export const CollegeProfilePage = () => <PageHeader title="College Profile" />;
