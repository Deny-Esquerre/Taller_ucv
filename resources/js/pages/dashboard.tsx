import { Head } from '@inertiajs/react';
import { SectionCards } from '@/components/section-cards';
import { ChartAreaInteractive } from '@/components/dashboard-chart';
import { DashboardActions } from '@/components/dashboard-actions';

export default function Dashboard({ stats, charts }: { stats: any, charts?: any }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Bienvenido al sistema de gestión de talleres UCV
                    </p>
                </div>
                
                <SectionCards stats={stats} />
                
                <DashboardActions />
                
                <ChartAreaInteractive data={charts?.interactive || []} />
            </div>
        </>
    );
}
