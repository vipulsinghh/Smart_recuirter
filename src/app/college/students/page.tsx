import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Filter, Search, UserPlus, Eye, Edit, Mail } from "lucide-react";
import Link from "next/link";

// Mock student data
const students = [
  { id: "s1", name: "Priya Sharma", email: "priya.s@example.com", department: "Computer Science", year: 4, cgpa: 8.75, status: "Eligible" as const },
  { id: "s2", name: "Rahul Verma", email: "rahul.v@example.com", department: "Information Technology", year: 4, cgpa: 7.20, status: "Not Eligible" as const },
  { id: "s3", name: "Anita Desai", email: "anita.d@example.com", department: "Electronics", year: 3, cgpa: 9.10, status: "Eligible" as const },
  { id: "s4", name: "Karan Singh", email: "karan.s@example.com", department: "Mechanical", year: 4, cgpa: 6.50, status: "Debarred" as const },
];

const getStatusBadgeVariant = (status: typeof students[number]['status']) => {
  switch (status) {
    case "Eligible": return "default"; // Primary or green
    case "Not Eligible": return "outline"; // Yellow or distinct warning
    case "Debarred": return "destructive";
    default: return "secondary";
  }
};

export default function ManageStudentsPage() {
  return (
    <>
      <PageHeader title="Manage Students" description="View and manage student registrations and eligibility.">
        <div className="flex items-center gap-2">
          <Input placeholder="Search students..." className="w-auto" />
           <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Dept." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="it">Info. Technology</SelectItem>
              <SelectItem value="ec">Electronics</SelectItem>
              <SelectItem value="mech">Mechanical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button asChild className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/college/students/register"><UserPlus className="h-4 w-4 mr-2" /> Register Student</Link>
          </Button>
        </div>
      </PageHeader>

      <Card className="shadow-sm">
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Year</TableHead>
                <TableHead className="text-right">CGPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                   <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${student.name.split(' ').map(n=>n[0]).join('')}`} alt={student.name} data-ai-hint="profile avatar" />
                      <AvatarFallback>{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell className="text-center">{student.year}</TableCell>
                  <TableCell className="text-right">{student.cgpa.toFixed(2)}</TableCell>
                  <TableCell><Badge variant={getStatusBadgeVariant(student.status)}>{student.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="View Details">
                        <Link href={`/college/students/${student.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Edit Student">
                        <Link href={`/college/students/${student.id}/edit`}><Edit className="h-4 w-4 text-blue-600" /></Link>
                      </Button>
                       <Button variant="ghost" size="icon" title="Contact Student">
                        <Mail className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {students.length === 0 && (
        <div className="text-center py-12 mt-6 bg-card rounded-lg shadow">
            <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">No Students Registered</h2>
            <p className="mt-2 text-muted-foreground">Use the button above to register new students to the platform.</p>
             <Button className="mt-4" asChild>
                <Link href="/college/students/register"><UserPlus className="h-4 w-4 mr-2" /> Register Student</Link>
            </Button>
        </div>
      )}
    </>
  );
}
