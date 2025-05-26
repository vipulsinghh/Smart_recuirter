import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, Filter, Building, MapPin, CalendarDays, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for placement drives
const drives = [
  { id: "1", companyName: "Tech Solutions Inc.", role: "Software Engineer Intern", location: "Remote", datePosted: "2024-07-15", salary: "Competitive Stipend", logo: "https://placehold.co/40x40.png?text=TS" },
  { id: "2", companyName: "Innovatech Ltd.", role: "Data Analyst", location: "New York, NY", datePosted: "2024-07-10", salary: "$70,000 - $80,000 PA", logo: "https://placehold.co/40x40.png?text=IL" },
  { id: "3", companyName: "Green Energy Co.", role: "Environmental Engineer", location: "Austin, TX", datePosted: "2024-07-05", salary: "$65,000 - $75,000 PA", logo: "https://placehold.co/40x40.png?text=GE" },
  { id: "4", companyName: "Marketing Gurus", role: "Digital Marketing Specialist", location: "Remote", datePosted: "2024-07-01", salary: "Based on Experience", logo: "https://placehold.co/40x40.png?text=MG" },
];

export default function StudentDrivesPage() {
  return (
    <>
      <PageHeader title="Placement Drives" description="Explore and apply to ongoing placement drives.">
        <div className="flex items-center gap-2">
          <Input placeholder="Search drives..." className="w-64" />
          <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </PageHeader>

      {drives.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {drives.map((drive) => (
            <Card key={drive.id} className="shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-primary">{drive.role}</CardTitle>
                    <CardDescription className="text-md text-foreground">{drive.companyName}</CardDescription>
                  </div>
                  <Image src={drive.logo} alt={`${drive.companyName} logo`} width={40} height={40} className="rounded-sm" data-ai-hint="company logo" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" /> {drive.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" /> Posted: {drive.datePosted}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BadgeDollarSign className="h-4 w-4 mr-2 flex-shrink-0" /> {drive.salary}
                </div>
              </CardContent>
              <CardContent className="pt-0"> {/* Ensure this CardContent is separate for the button */}
                <Button className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href={`/student/drives/${drive.id}`}>
                    View Details & Apply <Briefcase className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Image src="https://placehold.co/400x300.png?text=No+Drives+Available" alt="No drives available" width={400} height={300} className="mx-auto rounded-lg shadow-md mb-6" data-ai-hint="empty state document" />
          <h2 className="text-2xl font-semibold text-foreground">No Placement Drives Available</h2>
          <p className="mt-2 text-muted-foreground">Please check back later or contact your placement officer for more information.</p>
        </div>
      )}
    </>
  );
}
