"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AppLayoutClient, { type NavItem } from '@/components/layout/AppLayoutClient';
import { LayoutDashboard, PlusSquare, Users, UserCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const companyNavItems: NavItem[] = [
  { href: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchExact: true },
  { href: '/company/post-drive', label: 'Post Job Drive', icon: PlusSquare },
  { href: '/company/applicants', label: 'Manage Applicants', icon: Users },
  { href: '/company/profile', label: 'Company Profile', icon: UserCircle },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'company')) {
      router.replace('/login?reason=unauthorized_company');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'company') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-foreground">Loading Company Dashboard...</p>
      </div>
    );
  }

  return <AppLayoutClient navItems={companyNavItems} userRole="Company">{children}</AppLayoutClient>;
}
