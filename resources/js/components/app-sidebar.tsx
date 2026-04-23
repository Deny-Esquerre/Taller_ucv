import { Link, usePage } from '@inertiajs/react';
import { Calendar, LayoutGrid, Users, Lock } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { index as workshopsIndex } from '@/routes/workshops/index';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth.user?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Panel de control',
            href: dashboard().url,
            icon: LayoutGrid,
        },
        {
            title: 'Talleres',
            href: workshopsIndex().url,
            icon: Calendar,
            items: [
                {
                    title: 'Calendario General',
                    href: workshopsIndex().url,
                },
                {
                    title: 'Historial',
                    href: '/workshops/history',
                },
                ...(userRole === 'admin' ? [
                    {
                        title: 'Gestión Avanzada',
                        href: '/workshops/manage',
                    }
                ] : [])
            ]
        },
    ];

    const adminNavItems: NavItem[] = [];

    if (userRole === 'admin') {
        adminNavItems.push({
            title: 'Gestión de Usuarios',
            href: '/users',
            icon: Users,
        });
        adminNavItems.push({
            title: 'Gestión de Permisos',
            href: '/permissions',
            icon: Lock,
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} title="Plataforma" />

                {adminNavItems.length > 0 && (
                    <div className="mt-4">
                        <NavMain items={adminNavItems} title="Configuración Administrador" />
                    </div>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
