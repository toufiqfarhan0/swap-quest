'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Coins,
  Gamepad2,
  LayoutDashboard,
  PlusCircle,
  Repeat,
  Swords,
  Trophy,
  User,
} from 'lucide-react';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { CreditProvider, useCredits } from '@/context/credit-context';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/swap', label: 'Swap', icon: Repeat },
  { href: '/play', label: 'Play Games', icon: Swords },
  { href: '/leaderboards', label: 'Leaderboards', icon: Trophy },
  { href: '/create-game', label: 'Create Game', icon: PlusCircle },
];

function UserProfile() {
  const { credits } = useCredits();

  return (
     <SidebarMenuItem>
        <SidebarMenuButton>
          <Avatar className="size-7">
            <AvatarImage src="https://i.pravatar.cc/40?u=a042581f4e29026701d" alt="User Avatar" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <span>
            <span className="font-semibold">PlayerOne</span>
            <span className="text-xs text-muted-foreground block">{credits.toLocaleString()} Credits</span>
          </span>
        </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8 text-primary" />
            <h2 className="text-lg font-semibold font-headline">SwapQuest</h2>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
                    tooltip={item.label}
                  >
                    <span>
                      <item.icon />
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <Separator />

        <SidebarFooter>
          <SidebarMenu>
            <UserProfile />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CreditProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </CreditProvider>
  )
}
