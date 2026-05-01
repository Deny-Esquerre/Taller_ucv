import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';

interface NavMainItem extends NavItem {
    items?: NavItem[];
}

export function NavMain({ items = [], title }: { items: NavMainItem[]; title?: string }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-2">
            {title && (
                <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3 px-2">
                    {title}
                </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
                {items.map((item) => {
                    const hasItems = !!(item.items && item.items.length > 0);
                    const isActive = isCurrentUrl(item.href);
                    const Icon = item.icon;
                    
                    if (!hasItems) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.title}
                                    className={cn(
                                        "h-10 transition-all duration-200",
                                        isActive ? "bg-white/10 text-white font-bold" : "text-white/70 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Link href={item.href} prefetch className="flex w-full items-center">
                                        {Icon && <Icon className={cn("size-4 mr-2", isActive ? "opacity-100" : "opacity-60")} />}
                                        <span className="text-sm">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }

                    const isAnySubActive = item.items?.some(sub => isCurrentUrl(sub.href)) ?? false;

                    return (
                        <Collapsible 
                            key={item.title} 
                            asChild 
                            defaultOpen={isAnySubActive} 
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton 
                                        tooltip={item.title} 
                                        className={cn(
                                            "h-10 transition-all duration-200 text-white/70 hover:bg-white/5 hover:text-white",
                                            isAnySubActive && "text-white"
                                        )}
                                    >
                                        {Icon && <Icon className="size-4 mr-2 opacity-60" />}
                                        <span className="text-sm font-medium">{item.title}</span>
                                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 opacity-40" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-1">
                                    <SidebarMenuSub className="border-l border-white/10 ml-4.5 space-y-1 py-1">
                                        {item.items?.map((subItem) => {
                                            const isSubActive = isCurrentUrl(subItem.href);
                                            return (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild isActive={isSubActive}>
                                                        <Link 
                                                            href={subItem.href} 
                                                            className={cn(
                                                                "h-8 transition-colors",
                                                                isSubActive ? "text-white font-bold" : "text-white/60 hover:text-white"
                                                            )}
                                                        >
                                                            <span className="text-xs">{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
