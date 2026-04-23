import { Settings } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function AppLogo() {
    const { accentColor, resolvedAppearance } = useAppearance();
    const textColor = accentColor ? 'var(--sidebar-primary-foreground)' : undefined;
    const bgColor = accentColor || undefined;
    
    return (
        <>
            <div 
                className={cn(
                    "flex aspect-square size-8 items-center justify-center rounded-md shadow-sm border border-border/50",
                    !bgColor && (resolvedAppearance === 'dark' ? "bg-neutral-900" : "bg-white")
                )}
                style={bgColor ? { backgroundColor: bgColor } : {}}
            >
                <Settings className="size-5" style={textColor ? { color: textColor } : {}} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-sidebar-foreground hover:opacity-80 transition-opacity">
                    Sistema de Talleres UCV
                </span>
            </div>
        </>
    );
}
