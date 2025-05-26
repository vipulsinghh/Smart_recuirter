import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Building, GraduationCap } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary-end text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-end py-20 text-primary-foreground md:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://placehold.co/1920x1080.png?text=Abstract+Network')"}}
          data-ai-hint="abstract network"
        />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-accent">SmartRecruiter</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80 md:text-xl">
            Streamlining campus placements. Connecting students, companies, and colleges seamlessly for a brighter future.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose SmartRecruiter?
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            A comprehensive platform designed for every stakeholder in the placement process.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="rounded-full bg-accent/10 p-3 text-accent">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">For Students</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Discover placement drives, apply with ease, and track your application status in real-time.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="rounded-full bg-accent/10 p-3 text-accent">
                  <Briefcase className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">For Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Post job drives, reach a wide pool of talented students, and efficiently shortlist applicants.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="rounded-full bg-accent/10 p-3 text-accent">
                  <Building className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl">For Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manage placement activities, oversee student registrations, and communicate effectively.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Image section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Visualize Your Success
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              PlaceOn provides intuitive dashboards and tools to help you navigate the placement journey effectively.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Join SmartRecruiter Today</Link>
            </Button>
          </div>
          <div>
            <Image 
              src="https://measiim.edu.in/myweb/uploads/2022/05/placement.jpg" 
              alt="Dashboard Preview" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl"
              data-ai-hint="dashboard interface" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8 text-center">
        <div className="container">
          <Logo className="justify-center mb-4"/>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartRecruiter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
