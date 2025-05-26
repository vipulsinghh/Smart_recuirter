import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle }_ from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Filter, Search, PlusCircle, Eye, Edit, Link2 } from "lucide-react";
import Link from "next/link";

// Mock company data
const companies = [
  { id: "c1", name: "Tech Solutions Inc.", industry: "IT Services", drivesConducted: 5, status: "Active Partner" as const, contactPerson: "Ms. Priya HR", contactEmail: "priya.hr@techsolutions.com" },
  { id: "c2", name: "Innovatech Ltd.", industry: "R&D", drivesConducted: 2, status: "New Partner" as const, contactPerson: "Mr. Raj CEO", contactEmail: "raj.ceo@innovatech.com" },
  { id: "c3", name: "Green Energy Co.", industry: "Renewable Energy", drivesConducted: 3, status: "Past Partner" as const, contactPerson: "Mr. Alok Manager", contactEmail: "alok.mgr@greenenergy.com" },
];

const getStatusBadgeVariant = (status: typeof companies[number]['status']) => {
  switch (status) {
    case "Active Partner": return "default"; 
    case "New Partner": return "outline"; 
    case "Past Partner": return "secondary";
    default: return "secondary";
  }
};

export default function ManageCompaniesPage() {
  return (
    <>
      <PageHeader title="Manage Companies" description="Oversee relationships with recruiting companies.">
        <div className="flex items-center gap-2">
          <Input placeholder="Search companies..." className="w-auto" />
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button asChild className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/college/companies/add"><PlusCircle className="h-4 w-4 mr-2" /> Add Company</Link>
          </Button>
        </div>
      </PageHeader>

      <Card className="shadow-sm">
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead className="text-center">Drives</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10 rounded-sm"> {/* Square for company logos */}
                      <AvatarImage src={`https://placehold.co/40x40.png?text=${company.name.split(' ').map(n=>n[0]).join('')}`} alt={company.name} data-ai-hint="company logo"/>
                      <AvatarFallback>{company.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                     <div className="font-medium">{company.name}</div>
                    <div className="text-xs text-muted-foreground">{company.contactPerson} - {company.contactEmail}</div>
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell className="text-center">{company.drivesConducted}</TableCell>
                  <TableCell><Badge variant={getStatusBadgeVariant(company.status)}>{company.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" asChild title="View Details">
                        <Link href={`/college/companies/${company.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                       <Button variant="ghost" size="icon" asChild title="Edit Company">
                        <Link href={`/college/companies/${company.id}/edit`}><Edit className="h-4 w-4 text-blue-600" /></Link>
                      </Button>
                       <Button variant="ghost" size="icon" title="Visit Website">
                        <Link2 className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {companies.length === 0 && (
        <div className="text-center py-12 mt-6 bg-card rounded-lg shadow">
            <Building className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">No Companies Added</h2>
            <p className="mt-2 text-muted-foreground">Start by adding companies that participate in your placement drives.</p>
             <Button className="mt-4" asChild>
                <Link href="/college/companies/add"><PlusCircle className="h-4 w-4 mr-2" /> Add Company</Link>
            </Button>
        </div>
      )}
    </>
  );
}
