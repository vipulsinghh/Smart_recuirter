import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlusSquare, Save, CalendarIcon, Briefcase, MapPin, Users, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";


export default function PostJobDrivePage() {
  const [applicationDeadline, setApplicationDeadline] = React.useState<Date | undefined>();

  return (
    <>
      <PageHeader title="Post New Job Drive" description="Fill in the details for your new recruitment drive.">
        <Button><Save className="mr-2 h-4 w-4" /> Post Drive</Button>
      </PageHeader>

      <Card className="shadow-sm">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobTitle"><Briefcase className="inline-block mr-2 h-4 w-4 text-muted-foreground" />Job Title</Label>
              <Input id="jobTitle" placeholder="e.g., Software Engineer Intern" />
            </div>
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea id="jobDescription" placeholder="Describe the role, responsibilities, and requirements..." rows={6} />
            </div>
             <div>
              <Label htmlFor="requiredSkills">Required Skills</Label>
              <Input id="requiredSkills" placeholder="e.g., Java, Python, SQL, Communication (comma-separated)" />
            </div>
            <div>
              <Label htmlFor="location"><MapPin className="inline-block mr-2 h-4 w-4 text-muted-foreground" />Location</Label>
              <Input id="location" placeholder="e.g., Remote, New York City, San Francisco Bay Area" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Select>
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="salaryRange"><BadgeDollarSign className="inline-block mr-2 h-4 w-4 text-muted-foreground" />Salary/Stipend Range</Label>
              <Input id="salaryRange" placeholder="e.g., $50,000 - $70,000 PA or Competitive Stipend" />
            </div>
            <div>
              <Label htmlFor="applicationDeadline"><CalendarIcon className="inline-block mr-2 h-4 w-4 text-muted-foreground" />Application Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !applicationDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {applicationDeadline ? format(applicationDeadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={applicationDeadline}
                    onSelect={setApplicationDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="eligibilityCriteria"><Users className="inline-block mr-2 h-4 w-4 text-muted-foreground" />Eligibility Criteria</Label>
              <Textarea id="eligibilityCriteria" placeholder="e.g., Final year B.Tech CS/IT students, Minimum 7 CGPA..." rows={3} />
            </div>
             <div>
              <Label htmlFor="selectionProcess">Selection Process</Label>
              <Textarea id="selectionProcess" placeholder="e.g., Online Test -> Technical Interview -> HR Interview" rows={3} />
            </div>
          </div>
        </CardContent>
         <CardContent className="pt-2 pb-6 text-right">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
                <PlusSquare className="mr-2 h-5 w-5" /> Confirm and Post Drive
            </Button>
        </CardContent>
      </Card>
    </>
  );
}
