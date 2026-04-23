import { Head } from '@inertiajs/react';
import { index as workshopsIndex } from '@/routes/workshops/index';
import WorkshopsCalendar from '@/components/workshops-calendar';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useFlashToast } from '@/hooks/use-flash-toast';

interface Workshop {
    id: number;
    user: {
        name: string;
        email: string;
    };
    title: string;
    shift_date: string;
    shift_type: 'morning' | 'afternoon' | 'night';
    representative: string;
    email: string;
    modality: 'virtual' | 'presencial';
    year: number;
}

interface Props {
    workshops: Workshop[];
    blockedDays: any[];
    auth: {
        user: {
            id: number;
            name: string;
        }
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Talleres',
        href: workshopsIndex().url,
    },
];

export default function Index({ workshops = [], blockedDays = [], auth }: Props) {
    useFlashToast();
    const authUser = auth?.user;

    return (
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8">
            <Head title="Talleres" />

            <div className="mb-8 flex flex-col gap-2 border-b border-border pb-5">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">Programación de Talleres</h1>
                <p className="text-sm text-muted-foreground/80">
                    Administre la disponibilidad y el registro de actividades académicas.
                </p>
            </div>

            <div className="relative">
                <section className="bg-background rounded-2xl border border-border/40 overflow-hidden shadow-sm transition-all">
                    {authUser ? (
                        <div className="p-1 sm:p-2">
                            <WorkshopsCalendar workshops={workshops || []} blockedDays={blockedDays} authUser={authUser} />
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-muted/5 m-4 border-dashed border border-border/40 rounded-xl">
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
                                Inicie sesión para interactuar
                            </p>
                        </div>
                    )}
                </section>

                {(!workshops || workshops.length === 0) && (
                    <div className="mt-12 py-10 text-center">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/30 text-muted-foreground/40 mb-3">
                            <CalendarIcon className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em]">
                            Historial vacío
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// @ts-ignore
Index.layout = (page: any) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
