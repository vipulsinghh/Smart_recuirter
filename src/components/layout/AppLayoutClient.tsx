"use client";

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { Logo } from '@/components/common/Logo';
import { UserNav } from '@/components/layout/UserNav';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Settings, LogOut } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchExact?: boolean;
}

interface AppLayoutClientProps {
  navItems: NavItem[];
  children: ReactNode;
  userRole: string;
}

function AppSidebar({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo collapsed={!open} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={item.matchExact ? pathname === item.href : pathname.startsWith(item.href)}
                  tooltip={{ children: item.label, side: 'right', align: 'center' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              tooltip={{ children: "Settings", side: 'right', align: 'center' }}
            >
              <Link href="#"> {/* Replace with actual settings path later */}
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


export default function AppLayoutClient({ navItems, children, userRole }: AppLayoutClientProps) {
  const pathname = usePathname();
  // Find current page title
  const currentPage = navItems.find(item => item.matchExact ? pathname === item.href : pathname.startsWith(item.href));
  const pageTitle = currentPage ? currentPage.label : userRole.charAt(0).toUpperCase() + userRole.slice(1) + " Dashboard";


  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar navItems={navItems} />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className={cn("md:hidden")} /> {/* Only show on mobile, sidebar is collapsible on desktop */}
            <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-6 bg-secondary/50 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
