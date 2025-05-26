"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AppLayoutClient, { type NavItem } from '@/components/layout/AppLayoutClient';
import { LayoutDashboard, Briefcase, FileText, UserCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const studentNavItems: NavItem[] = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/student/drives', label: 'Placement Drives', icon: Briefcase },
  { href: '/student/applications', label: 'My Applications', icon: FileText },
  { href: '/student/profile', label: 'Profile', icon: UserCircle },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.replace('/login?reason=unauthorized_student');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'student') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-foreground">Loading Student Dashboard...</p>
      </div>
    );
  }

  return <AppLayoutClient navItems={studentNavItems} userRole="Student">{children}</AppLayoutClient>;
}
