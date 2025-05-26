import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Filter, Search, Download, Eye, CheckCircle, XCircle, Mail } from "lucide-react";
import Link from "next/link";

// Mock applicant data
const applicants = [
  { id: "std1", name: "Priya Sharma", email: "priya.s@example.com", drive: "Software Engineer Intern", status: "Shortlisted" as const, appliedDate: "2024-07-18", score: 85 },
  { id: "std2", name: "Rahul Verma", email: "rahul.v@example.com", drive: "Software Engineer Intern", status: "Applied" as const, appliedDate: "2024-07-19", score: 72 },
  { id: "std3", name: "Anita Desai", email: "anita.d@example.com", drive: "Data Analyst", status: "Interviewing" as const, appliedDate: "2024-07-15", score: 92 },
  { id: "std4", name: "Karan Singh", email: "karan.s@example.com", drive: "Marketing Specialist", status: "Rejected" as const, appliedDate: "2024-07-10", score: 60 },
  { id: "std5", name: "Sneha Reddy", email: "sneha.r@example.com", drive: "Software Engineer Intern", status: "Hired" as const, appliedDate: "2024-07-05", score: 95 },
];

const getStatusBadgeVariant = (status: typeof applicants[number]['status']) => {
  switch (status) {
    case "Applied": return "secondary";
    case "Shortlisted": return "default";
    case "Interviewing": return "outline"; // consider a yellow-ish color for this
    case "Hired": return "default"; // consider a green color for this
    case "Rejected": return "destructive";
    default: return "secondary";
  }
};

export default function ManageApplicantsPage() {
  return (
    <>
      <PageHeader title="Manage Applicants" description="View, filter, and manage applicants for your job drives.">
        <div className="flex items-center gap-2">
          <Input placeholder="Search applicants..." className="w-auto" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Drive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drives</SelectItem>
              <SelectItem value="drive1">Software Engineer Intern</SelectItem>
              <SelectItem value="drive2">Data Analyst</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Apply Filters</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export List</Button>
        </div>
      </PageHeader>

      <Card className="shadow-sm">
        <CardContent className="pt-0"> {/* Removed default padding-top */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${applicant.name.split(' ').map(n=>n[0]).join('')}`} alt={applicant.name} data-ai-hint="profile avatar" />
                      <AvatarFallback>{applicant.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{applicant.name}</div>
                    <div className="text-xs text-muted-foreground">{applicant.email}</div>
                  </TableCell>
                  <TableCell>{applicant.drive}</TableCell>
                  <TableCell><Badge variant={getStatusBadgeVariant(applicant.status)}>{applicant.status}</Badge></TableCell>
                  <TableCell className="text-right">{applicant.score}%</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="View Profile">
                        <Link href={`/company/applicants/${applicant.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" title="Shortlist">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                       <Button variant="ghost" size="icon" title="Reject">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                       <Button variant="ghost" size="icon" title="Contact">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {applicants.length === 0 && (
        <div className="text-center py-12 mt-6 bg-card rounded-lg shadow">
            <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">No Applicants Yet</h2>
            <p className="mt-2 text-muted-foreground">Once students start applying to your drives, they will appear here.</p>
        </div>
      )}
    </>
  );
}
