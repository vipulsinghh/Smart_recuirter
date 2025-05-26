"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AppLayoutClient, { type NavItem } from '@/components/layout/AppLayoutClient';
import { LayoutDashboard, Briefcase, GraduationCap, Building, MessageSquare, UserCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const collegeNavItems: NavItem[] = [
  { href: '/college/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/college/drives', label: 'Manage Drives', icon: Briefcase },
  { href: '/college/students', label: 'Manage Students', icon: GraduationCap },
  { href: '/college/companies', label: 'Manage Companies', icon: Building },
  { href: '/college/communications', label: 'Communications', icon: MessageSquare },
  { href: '/college/profile', label: 'Profile', icon: UserCircle },
];

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'college')) {
      router.replace('/login?reason=unauthorized_college');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'college') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-foreground">Loading College Dashboard...</p>
      </div>
    );
  }

  return <AppLayoutClient navItems={collegeNavItems} userRole="College">{children}</AppLayoutClient>;
}
