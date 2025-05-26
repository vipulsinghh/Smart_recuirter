import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Edit3, UploadCloud, Save, Mail, Phone, Linkedin, GraduationCap as DegreeIcon, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock user data
const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 234 567 8900",
  linkedin: "linkedin.com/in/alexjohnson",
  avatarUrl: "https://placehold.co/128x128.png?text=AJ",
  bio: "Aspiring software engineer with a passion for AI and web development. Eager to contribute to innovative projects and learn from experienced professionals. Strong problem-solving skills and a collaborative mindset.",
  degree: "B.Tech in Computer Science",
  university: "State University",
  graduationYear: "2025",
  cgpa: "8.75",
  skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
  resumeUrl: "#" // Placeholder
};

export default function StudentProfilePage() {
  return (
    <>
      <PageHeader title="My Profile" description="Manage your personal information, academic details, and resume.">
        <Button><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Avatar and Basic Info */}
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader className="items-center text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="profile picture" />
                <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-2xl">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span>{userProfile.phone || "Not Provided"}</span>
            </div>
            <div className="flex items-center text-sm">
              <Linkedin className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <a href={`https://${userProfile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {userProfile.linkedin || "Not Provided"}
              </a>
            </div>
            <Separator className="my-4" />
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={userProfile.bio} rows={5} className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Academic, Skills, Resume */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><DegreeIcon className="mr-2 h-5 w-5 text-primary" /> Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="degree">Degree</Label><Input id="degree" defaultValue={userProfile.degree} /></div>
              <div><Label htmlFor="university">University/College</Label><Input id="university" defaultValue={userProfile.university} /></div>
              <div><Label htmlFor="gradYear">Graduation Year</Label><Input id="gradYear" defaultValue={userProfile.graduationYear} /></div>
              <div><Label htmlFor="cgpa">CGPA/Percentage</Label><Input id="cgpa" defaultValue={userProfile.cgpa} /></div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary" /> Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {/* In a real app, this would be an editable tag input */}
              <Input defaultValue={userProfile.skills.join(', ')} placeholder="e.g., JavaScript, Python, Communication" />
              <p className="text-xs text-muted-foreground mt-1">Separate skills with commas.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><UploadCloud className="mr-2 h-5 w-5 text-primary" /> Resume</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
              {userProfile.resumeUrl !== "#" ? (
                 <p className="text-sm text-muted-foreground">Current resume: <a href={userProfile.resumeUrl} className="text-primary hover:underline">my_resume.pdf</a></p>
              ) : (
                 <p className="text-sm text-muted-foreground">No resume uploaded yet.</p>
              )}
              <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload New Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
