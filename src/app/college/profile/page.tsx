import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle }_ from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { University, Edit3, Save, Globe, Mail, Phone, MapPin } from "lucide-react";

// Mock college data
const collegeProfile = {
  name: "Premier Engineering College",
  shortName: "PEC",
  email: "placementoffice@pec.edu",
  phone: "+91 123 456 7890",
  website: "www.pec.edu",
  address: "1 College Road, Education City, State 12345",
  logoUrl: "https://placehold.co/128x128.png?text=PEC",
  about: "Premier Engineering College (PEC) is a leading institution dedicated to excellence in engineering education and research. Our placement cell strives to connect talented students with top companies.",
  accreditation: "NAAC A++, NBA Accredited",
  placementOfficer: "Dr. R. K. Sharma",
};

export default function CollegeProfilePage() {
  return (
    <>
      <PageHeader title="College Profile & Settings" description="Manage your institution's details and placement settings.">
        <Button><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Logo and Basic Info */}
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader className="items-center text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20 rounded-md">
                <AvatarImage src={collegeProfile.logoUrl} alt={collegeProfile.name} data-ai-hint="college logo"/>
                <AvatarFallback>{collegeProfile.shortName}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-2xl">{collegeProfile.name}</CardTitle>
            <CardDescription>{collegeProfile.accreditation}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
             <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <a href={`https://${collegeProfile.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {collegeProfile.website}
              </a>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span>{collegeProfile.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span>{collegeProfile.phone}</span>
            </div>
             <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span>{collegeProfile.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: About, Placement Officer, Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><University className="mr-2 h-5 w-5 text-primary" /> About College</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea id="about" defaultValue={collegeProfile.about} rows={5} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Placement Cell Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="placementOfficer">Placement Officer Name</Label>
                <Input id="placementOfficer" defaultValue={collegeProfile.placementOfficer} />
              </div>
               <div>
                <Label htmlFor="placementEmail">Placement Cell Email</Label>
                <Input id="placementEmail" type="email" defaultValue={collegeProfile.email} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure placement drive visibility, notification preferences, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings related to student eligibility criteria, company verification process, and communication templates will appear here.</p>
              {/* Placeholder for actual settings form elements */}
               <Button variant="outline" className="mt-4">Configure Advanced Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
