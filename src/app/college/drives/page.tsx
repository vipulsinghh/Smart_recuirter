import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Filter, Search, PlusCircle, Edit, Trash2, Users, CalendarDays } from "lucide-react";
import Link from "next/link";

// Mock drives data
const drives = [
  { id: "drv1", companyName: "Tech Solutions Inc.", role: "Software Engineer Intern", status: "Open" as const, studentsApplied: 120, deadline: "2024-08-15" },
  { id: "drv2", companyName: "Innovatech Ltd.", role: "Data Analyst", status: "Interviewing" as const, studentsApplied: 75, deadline: "2024-08-01" },
  { id: "drv3", companyName: "Green Energy Co.", role: "Environmental Engineer", status: "Closed" as const, studentsApplied: 90, deadline: "2024-07-20" },
  { id: "drv4", companyName: "Marketing Gurus", role: "Digital Marketing Specialist", status: "Open" as const, studentsApplied: 45, deadline: "2024-08-30" },
];

const getStatusBadgeVariant = (status: typeof drives[number]['status']) => {
  switch (status) {
    case "Open": return "default"; // Primary or green
    case "Interviewing": return "outline"; // Yellow or distinct
    case "Closed": return "secondary";
    default: return "secondary";
  }
};

export default function ManageDrivesPage() {
  return (
    <>
      <PageHeader title="Manage Placement Drives" description="Oversee all active and past placement drives.">
        <div className="flex items-center gap-2">
          <Input placeholder="Search drives..." className="w-auto" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button asChild className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/college/drives/new"><PlusCircle className="h-4 w-4 mr-2" /> Add New Drive</Link>
          </Button>
        </div>
      </PageHeader>

      <Card className="shadow-sm">
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Applicants</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drives.map((drive) => (
                <TableRow key={drive.id}>
                  <TableCell className="font-medium">{drive.companyName}</TableCell>
                  <TableCell>{drive.role}</TableCell>
                  <TableCell><Badge variant={getStatusBadgeVariant(drive.status)}>{drive.status}</Badge></TableCell>
                  <TableCell className="text-right">{drive.studentsApplied}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                        <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" /> {drive.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="View Applicants">
                        <Link href={`/college/drives/${drive.id}/applicants`}><Users className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Edit Drive">
                        <Link href={`/college/drives/${drive.id}/edit`}><Edit className="h-4 w-4 text-blue-600" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete Drive">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {drives.length === 0 && (
        <div className="text-center py-12 mt-6 bg-card rounded-lg shadow">
            <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">No Drives Found</h2>
            <p className="mt-2 text-muted-foreground">Start by adding a new placement drive for students.</p>
             <Button className="mt-4" asChild>
                <Link href="/college/drives/new"><PlusCircle className="h-4 w-4 mr-2" /> Add Drive</Link>
            </Button>
        </div>
      )}
    </>
  );
}
