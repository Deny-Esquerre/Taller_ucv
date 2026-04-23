import { Settings } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white text-foreground shadow-sm border border-border/50 dark:bg-neutral-900">
                <Settings className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-sidebar-foreground dark:text-neutral-100">Sistema de Talleres UCV</span>
            </div>
        </>
    );
}
