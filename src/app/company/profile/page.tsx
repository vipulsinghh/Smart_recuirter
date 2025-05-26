import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Edit3, Save, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock company data
const companyProfile = {
  name: "Tech Solutions Inc.",
  tagline: "Innovating the Future, Today.",
  email: "hr@techsolutions.com",
  phone: "+1 800 123 4567",
  website: "www.techsolutions.com",
  address: "123 Innovation Drive, Tech Park, CA 90210",
  logoUrl: "https://placehold.co/128x128.png?text=TS",
  about: "Tech Solutions Inc. is a leading provider of cutting-edge technology services, specializing in cloud computing, AI, and cybersecurity. We are committed to fostering talent and driving innovation.",
  industry: "Information Technology & Services",
  size: "500-1000 employees",
};

export default function CompanyProfilePage() {
  return (
    <>
      <PageHeader title="Company Profile" description="Manage your company's information and branding.">
        <Button><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Logo and Basic Info */}
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader className="items-center text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20 rounded-md"> {/* Square avatar for companies */}
                <AvatarImage src={companyProfile.logoUrl} alt={companyProfile.name} data-ai-hint="company logo" />
                <AvatarFallback>{companyProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-2xl">{companyProfile.name}</CardTitle>
            <CardDescription>{companyProfile.tagline}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <a href={`https://${companyProfile.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {companyProfile.website}
              </a>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span>{companyProfile.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span>{companyProfile.phone}</span>
            </div>
             <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span>{companyProfile.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: About, Industry, Size */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><Building className="mr-2 h-5 w-5 text-primary" /> About Company</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea id="about" defaultValue={companyProfile.about} rows={6} />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue={companyProfile.industry} />
              </div>
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Input id="companySize" defaultValue={companyProfile.size} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
