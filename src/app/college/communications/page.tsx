import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle }_ from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Users, Briefcase, MailPlus, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data
const announcements = [
  { id: "ann1", title: "Upcoming Pre-placement Talk by Tech Solutions Inc.", date: "2024-07-20", audience: "All Students", content: "..." },
  { id: "ann2", title: "Deadline Extended for Innovatech Ltd. Applications", date: "2024-07-18", audience: "Eligible CS/IT Students", content: "..." },
];

const directMessages = [
    { id: "dm1", from: "Priya Sharma (Student)", subject: "Query regarding SE Intern role", date: "3 hours ago", unread: true },
    { id: "dm2", from: "HR @ Tech Solutions Inc.", subject: "Interview Schedule Confirmation", date: "1 day ago", unread: false },
];


export default function CommunicationsPage() {
  return (
    <>
      <PageHeader title="Communications Center" description="Send announcements and manage direct messages.">
        <Button asChild className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/college/communications/new"><MailPlus className="h-4 w-4 mr-2" /> New Message/Announcement</Link>
        </Button>
      </PageHeader>

      <Tabs defaultValue="announcements">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="announcements"><Bell className="mr-2 h-4 w-4" />Announcements</TabsTrigger>
          <TabsTrigger value="messages"><MessageSquare className="mr-2 h-4 w-4" />Direct Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
          <Card className="shadow-sm mt-4">
            <CardHeader>
              <CardTitle>Sent Announcements</CardTitle>
              <CardDescription>Manage and track announcements sent to students and companies.</CardDescription>
            </CardHeader>
            <CardContent>
              {announcements.length > 0 ? (
                <ul className="space-y-4">
                  {announcements.map(ann => (
                    <li key={ann.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-primary">{ann.title}</h3>
                          <p className="text-xs text-muted-foreground">Sent on {ann.date} to {ann.audience}</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <Image src="https://placehold.co/300x200.png?text=No+Announcements" alt="No announcements" width={300} height={200} className="mx-auto rounded-md mb-4" data-ai-hint="empty state mail" />
                  <p className="text-muted-foreground">No announcements have been sent yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="shadow-sm mt-4">
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <CardDescription>Direct messages from students and company representatives.</CardDescription>
            </CardHeader>
            <CardContent>
               {directMessages.length > 0 ? (
                <ul className="space-y-2">
                  {directMessages.map(msg => (
                    <li key={msg.id} className={`p-3 border rounded-md flex items-center justify-between hover:bg-secondary/50 ${msg.unread ? 'border-primary font-medium' : ''}`}>
                      <div className="flex items-center gap-3">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://placehold.co/32x32.png?text=${msg.from[0]}`} data-ai-hint="avatar profile"/>
                            <AvatarFallback>{msg.from[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-foreground">{msg.from}</p>
                            <p className={`text-xs ${msg.unread ? 'text-primary' : 'text-muted-foreground'}`}>{msg.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild>
                            <Link href={`/college/communications/message/${msg.id}`}>Reply</Link>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <Image src="https://placehold.co/300x200.png?text=Inbox+Empty" alt="Inbox empty" width={300} height={200} className="mx-auto rounded-md mb-4" data-ai-hint="empty state mail" />
                  <p className="text-muted-foreground">Your inbox is empty.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
