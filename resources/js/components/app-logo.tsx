import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

interface AppLogoProps {
    className?: string;
}

export default function AppLogo({ className }: AppLogoProps) {
    const { resolvedAppearance } = useAppearance();
    
    return (
        <>
            <div 
                className={cn(
                    "flex aspect-square size-8 items-center justify-center rounded-md shadow-sm border border-white/10 bg-[rgb(220,38,38)]",
                    className
                )}
            >
                <img 
                    src="/images/image.webp" 
                    alt="Logo UCV" 
                    className="size-5 object-contain brightness-0 invert" 
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold text-white tracking-tight">
                    Talleres UCV
                </span>
                <span className="truncate text-[10px] leading-tight text-white/60 font-medium">
                    Gestión Académica
                </span>
            </div>
        </>
    );
}
