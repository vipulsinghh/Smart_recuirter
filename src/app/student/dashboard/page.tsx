"use client";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CareerPredictionModal from '@/components/CareerPredictionModal';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function StudentDashboardPage() {
  // Mock data
  const upcomingDrives = [
    { id: 1, company: "Tech Solutions Inc.", role: "Software Engineer Intern", date: "2024-08-15" },
    { id: 2, company: "Innovatech Ltd.", role: "Data Analyst", date: "2024-08-20" },
  ];

  const applicationStats = {
    applied: 5,
    shortlisted: 2,
    interviewing: 1,
    offered: 0,
  };

  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Remove the separate state for career predictions on the dashboard,
  // as prediction will happen within the modal now.
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Student Data:", docSnap.data()); // Log the data
            setStudentData(docSnap.data());
          } else {
            setError("Student data not found.");
          }
        }
      } catch (err) {
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // Placeholder AI prediction function based on skills
  const predictCareerPath = (data: any | null): string[] => {
    const skills = data?.skills?.toLowerCase() || "";
    const predictions: string[] = [];

    if (skills.includes("web development")) {
      predictions.push("Frontend Developer");
      predictions.push("Backend Developer");
      predictions.push("Full-stack Developer");
    }
    if (skills.includes("data analysis")) {
      predictions.push("Data Analyst");
      predictions.push("Business Intelligence Analyst");
    }
    if (skills.includes("machine learning")) {
      predictions.push("Machine Learning Engineer");
      predictions.push("AI Engineer");
    }
    if (predictions.length === 0) {
      predictions.push("Based on your skills, exploring roles in general IT or a related technical field is recommended.");
    }
    return predictions;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <PageHeader title="Student Dashboard" description="Overview of your placement activities."/>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Drives</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/drives">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingDrives.length > 0 ? (
              <ul className="space-y-3">
                {upcomingDrives.map(drive => (
                  <li key={drive.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    <div>
                      <p className="font-semibold text-foreground">{drive.company} - <span className="font-normal">{drive.role}</span></p>
                      <p className="text-sm text-muted-foreground">Date: {drive.date}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/student/drives/${drive.id}`}>Details</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">No upcoming drives at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Application Status</CardTitle>
            <CardDescription>Summary of your job applications.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3 bg-primary/10 rounded-md">
              <p className="text-2xl font-bold text-primary">{applicationStats.applied}</p>
              <p className="text-sm text-muted-foreground">Applied</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-accent/10 rounded-md">
              <p className="text-2xl font-bold text-accent">{applicationStats.shortlisted}</p>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-yellow-500/10 rounded-md">
              <p className="text-2xl font-bold text-yellow-600">{applicationStats.interviewing}</p>
              <p className="text-sm text-muted-foreground">Interviewing</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-green-500/10 rounded-md">
              <p className="text-2xl font-bold text-green-600">{applicationStats.offered}</p>
              <p className="text-sm text-muted-foreground">Offered</p>
            </div>
          </CardContent>
           <CardContent className="pt-0">
             <Button className="w-full mt-2" asChild>
                <Link href="/student/applications">Track Applications <FileText className="ml-2 h-4 w-4" /></Link>
             </Button>
           </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={openModal}>
        <CardHeader>
          <CardTitle className="text-lg font-medium">AI Career Path Prediction</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
           <p className="text-muted-foreground text-center">Click here to get your personalized career path prediction.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Bell className="mr-2 h-5 w-5 text-accent"/> Notifications & Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
              <Image src="https://placehold.co/300x200.png?text=No+Notifications" alt="No notifications" width={300} height={200} className="mx-auto rounded-md" data-ai-hint="empty state notification" />
            <p className="mt-4 text-muted-foreground">No new notifications or announcements.</p>
            <p className="text-sm text-muted-foreground">Check back later for updates from your college or companies.</p>
          </div>
        </CardContent>
      </Card>
 {isModalOpen && studentData && <CareerPredictionModal isOpen={isModalOpen} onClose={closeModal} studentData={studentData} />}
    </>
  );
}

// Placeholder pages for navigation items
export const DrivesPage = () => <PageHeader title="Placement Drives" />;
export const ApplicationsPage = () => <PageHeader title="My Applications" />;
export const ProfilePage = () => <PageHeader title="My Profile" />;

