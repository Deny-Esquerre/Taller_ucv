import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Trash2, Lock, Info, ChevronLeft, ChevronRight, Unlock } from 'lucide-react';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

interface BlockedDay {
    id: number;
    date: string;
    reason: string | null;
    is_enabled: boolean;
}

interface Props {
    allBlocked: BlockedDay[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Talleres', href: '/workshops' },
    { title: 'Disponibilidad', href: '/workshops/manage' },
];

export default function WorkshopManage({ allBlocked = [] }: Props) {
    useFlashToast();
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);

    const { data, setData, post, processing, reset, delete: destroyAction } = useForm({
        date: '',
        reason: '',
        is_enabled: false,
    });

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonthRaw = new Date(year, month, 1).getDay();
    const firstDayOfMonth = firstDayOfMonthRaw === 0 ? 6 : firstDayOfMonthRaw - 1;

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getDayInfo = (dateStr: string) => {
        const dbEntry = allBlocked.find(d => d.date === dateStr);
        const dateObj = new Date(dateStr + 'T00:00:00');
        const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

        return {
            exists: !!dbEntry,
            id: dbEntry?.id,
            reason: dbEntry?.reason,
            is_enabled: dbEntry ? !!dbEntry.is_enabled : false,
            is_weekend: isWeekend
        };
    };

    const handleDayClick = (dateStr: string) => {
        const info = getDayInfo(dateStr);
        setSelectedDate(dateStr);
        setData({
            date: dateStr,
            reason: info.reason || '',
            is_enabled: info.is_enabled,
        });
        setIsActionModalOpen(true);
    };

    const handleSaveStatus = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/workshops/manage', {
            preserveScroll: true,
            onSuccess: () => {
                setIsActionModalOpen(false);
                reset();
            },
            onError: (errors) => {
                console.error("Errores:", errors);
            }
        });
    };

    const handleReset = (id: number) => {
        destroyAction(route('workshops.manage.destroy', id), {
            preserveScroll: true,
            onSuccess: () => setIsActionModalOpen(false),
        });
    };

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`pad-${i}`} className="h-12 sm:h-20 border border-border/30 bg-muted/5" />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const info = getDayInfo(dateStr);
            
            // Estado visual: bloqueado si es fin de semana y NO está habilitado, o si existe registro y NO está habilitado
            const isBlocked = (info.is_weekend && !info.is_enabled) || (info.exists && !info.is_enabled);
            const isEnabled = info.is_enabled;

            days.push(
                <button
                    key={d}
                    type="button"
                    onClick={() => handleDayClick(dateStr)}
                    className={cn(
                        "relative h-12 sm:h-20 border border-border/40 p-1 transition-all flex flex-col items-center justify-center gap-1 group",
                        isBlocked && "bg-red-500/[0.03] hover:bg-red-500/[0.06]",
                        isEnabled && "bg-green-500/[0.03] hover:bg-green-500/[0.06]",
                        !isBlocked && !isEnabled && "bg-background hover:bg-muted/30"
                    )}
                >
                    <span className={cn(
                        "text-[10px] font-bold",
                        isBlocked ? "text-red-500/60" : isEnabled ? "text-green-600/60" : "text-muted-foreground/50"
                    )}>
                        {d}
                    </span>
                    
                    {isBlocked && <Lock className="h-3 w-3 text-red-500/30 group-hover:scale-110 transition-transform" />}
                    {isEnabled && <Unlock className="h-3 w-3 text-green-500/30 group-hover:scale-110 transition-transform" />}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8">
            <Head title="Disponibilidad" />
            
            <div className="mb-8 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground uppercase tracking-wider">Disponibilidad del Sistema</h1>
                    <p className="text-sm text-muted-foreground/80 font-medium">Gestión visual de días laborables y excepciones.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none bg-muted/30 shadow-none rounded-2xl p-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/60">
                                <Info className="h-4 w-4 text-primary" />
                                Guía de colores
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30" />
                                    No laborable (Bloqueado)
                                </div>
                                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/30" />
                                    Habilitado manualmente
                                </div>
                                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                                    <div className="h-3 w-3 rounded-full bg-border" />
                                    Laborable estándar
                                </div>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed pt-4 border-t border-border/40 font-medium italic">
                                Toque un día para alternar su estado.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-background rounded-2xl overflow-hidden border border-border/60 shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/10">
                            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                                {monthNames[month]} <span className="text-primary/60">{year}</span>
                            </h2>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-7 border-b border-border/30 bg-muted/5 text-center">
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
                                <div key={idx} className="py-2 border-r border-border/30 last:border-0">
                                    <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
                    </div>
                </div>
            </div>

            <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
                <DialogContent className="sm:max-w-[380px] border-none bg-background shadow-2xl rounded-2xl p-0 overflow-hidden">
                    <form onSubmit={handleSaveStatus}>
                        <DialogHeader className="p-6 pb-2 bg-muted/20 border-b border-border/30">
                            <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-primary/70" />
                                {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { 
                                    day: 'numeric', month: 'long', year: 'numeric' 
                                })}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground/70 tracking-widest">Seleccione estado</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setData('is_enabled', true)}
                                        className={cn(
                                            "flex items-center justify-center gap-2 h-11 rounded-xl border text-[11px] font-bold transition-all",
                                            data.is_enabled 
                                                ? "bg-green-500/10 border-green-500/40 text-green-700" 
                                                : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <Unlock className="h-3.5 w-3.5" /> HABILITAR
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('is_enabled', false)}
                                        className={cn(
                                            "flex items-center justify-center gap-2 h-11 rounded-xl border text-[11px] font-bold transition-all",
                                            !data.is_enabled 
                                                ? "bg-red-500/10 border-red-500/40 text-red-700" 
                                                : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <Lock className="h-3.5 w-3.5" /> BLOQUEAR
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase text-muted-foreground/70 tracking-widest">Nota / Motivo</Label>
                                <Input 
                                    placeholder="Ej: Feriado, limpieza..." 
                                    value={data.reason} 
                                    onChange={e => setData('reason', e.target.value)}
                                    className="bg-muted/30 border-none h-11 rounded-xl text-xs px-4"
                                />
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-0 flex gap-2">
                            {getDayInfo(selectedDate || '').id && (
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => handleReset(getDayInfo(selectedDate!).id!)}
                                    className="h-11 px-3 text-destructive hover:bg-red-50 hover:text-red-700 rounded-xl"
                                    title="Quitar regla"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="flex-1 h-11 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl text-[11px] uppercase tracking-wider"
                            >
                                {processing ? 'PROCESANDO...' : 'ACTUALIZAR ESTADO'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// @ts-ignore
WorkshopManage.layout = (page: any) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
