import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon, Coffee, ArrowLeft, Clock, MapPin, Globe, Info, Link as LinkIcon, CheckCircle2, Trash2, Edit2 } from 'lucide-react';
import { useForm, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { store as workshopsStore } from '@/routes/workshops/index';
import { useNotifications } from '@/hooks/use-notifications';

interface Workshop {
    id: number;
    shift_date: string;
    shift_type: 'morning' | 'afternoon' | 'night';
    title: string;
    representative?: string;
    email?: string;
    modality?: 'virtual' | 'presencial';
    meeting_link?: string;
    location?: string;
    status: 'scheduled' | 'completed';
}

interface BlockedDay {
    date: string;
    reason: string | null;
    is_enabled?: boolean;
}

interface WorkshopsCalendarProps {
    workshops: Workshop[];
    blockedDays?: BlockedDay[];
    authUser: {
        id: number;
        name: string;
    };
}

export default function WorkshopsCalendar({ workshops = [], blockedDays = [], authUser }: WorkshopsCalendarProps) {
    const { requestPermission, sendNotification } = useNotifications();

    useEffect(() => {
        requestPermission();
    }, [requestPermission]);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedShift, setSelectedShift] = useState<'morning' | 'afternoon' | 'night' | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingWorkshopId, setEditingWorkshopId] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: authUser?.id?.toString() || '',
        title: '',
        shift_date: '',
        shift_type: '',
        representative: '',
        email: '',
        modality: '',
        meeting_link: '',
        location: '',
        year: new Date().getFullYear(),
    });

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonthRaw = new Date(year, month, 1).getDay();
    const firstDayOfMonth = firstDayOfMonthRaw === 0 ? 6 : firstDayOfMonthRaw - 1;

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getDayStatus = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        const dbDay = blockedDays.find(d => d.date === dateString);
        if (dbDay?.is_enabled) return { blocked: false, label: 'Día Habilitado', type: 'enabled' };
        if (dbDay) return { blocked: true, label: dbDay.reason || 'Día No Laborable', type: 'blocked' };
        if (date.getDay() === 0 || date.getDay() === 6) return { blocked: true, label: 'Día No Laborable', type: 'weekend' };
        return { blocked: false, label: '', type: 'available' };
    };

    const getWorkshopsForDate = (date: Date | null) => {
        if (!date) return [];
        const dateString = date.toISOString().split('T')[0];
        return workshops.filter((w) => w.shift_date.startsWith(dateString));
    };

    const handleDateClick = (date: Date) => {
        const status = getDayStatus(date);
        if (status.blocked) return;
        
        setSelectedDate(date);
        setSelectedShift(null);
        setIsEditing(false);
        setIsDialogOpen(true);
        setData({
            ...data,
            shift_date: date.toISOString().split('T')[0],
            shift_type: '',
            modality: '',
            meeting_link: '',
            location: '',
        });
        reset('title', 'representative', 'email', 'modality', 'meeting_link', 'location');
    };

    const handleShiftSelect = (type: 'morning' | 'afternoon' | 'night') => {
        setSelectedShift(type);
        setData('shift_type', type);
        setIsEditing(false);
    };

    const handleEditWorkshop = (workshop: Workshop) => {
        setEditingWorkshopId(workshop.id);
        setIsEditing(true);
        setSelectedShift(workshop.shift_type);
        setData({
            user_id: authUser.id.toString(),
            title: workshop.title,
            shift_date: workshop.shift_date.split('T')[0],
            shift_type: workshop.shift_type,
            representative: workshop.representative || '',
            email: workshop.email || '',
            modality: workshop.modality || '',
            meeting_link: workshop.meeting_link || '',
            location: workshop.location || '',
            year: new Date().getFullYear(),
        });
    };

    const handleCompleteWorkshop = (id: number) => {
        router.put(`/workshops/${id}/complete`, {}, {
            onSuccess: () => setIsDialogOpen(false)
        });
    };

    const handleReleaseBlock = (id: number) => {
        if (confirm('¿Está seguro de liberar este bloque? El registro será eliminado.')) {
            router.delete(`/workshops/${id}`, {
                onSuccess: () => setIsDialogOpen(false)
            });
        }
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditing && editingWorkshopId) {
            router.put(`/workshops/${editingWorkshopId}`, data, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setIsEditing(false);
                }
            });
            return;
        }

        post(workshopsStore().url, {
            onSuccess: () => {
                setIsDialogOpen(false);
                
                // Notificación nativa del navegador
                const formattedDate = new Date(data.shift_date + 'T00:00:00').toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'long'
                });

                sendNotification(
                    'Taller Registrado',
                    `${authUser.name} agregó el taller "${data.title}" para el día ${formattedDate}`
                );

                reset();
            },
        });
    };

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`pad-${i}`} className="h-16 sm:h-36 border border-border/40 bg-muted/10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const status = getDayStatus(date);
        const dailyWorkshops = getWorkshopsForDate(date);
        const morningW = dailyWorkshops.find(w => w.shift_type === 'morning');
        const afternoonW = dailyWorkshops.find(w => w.shift_type === 'afternoon');
        const nightW = dailyWorkshops.find(w => w.shift_type === 'night');

        days.push(
            <TooltipProvider key={d} delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            onClick={() => handleDateClick(date)}
                            className={cn(
                                "relative h-16 sm:h-36 border border-border/60 p-1 sm:p-2 transition-all flex flex-col items-stretch overflow-hidden group",
                                status.blocked ? "bg-red-50/[0.02] dark:bg-red-950/[0.05] cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-muted/40 bg-background",
                                status.type === 'enabled' && "bg-green-50/[0.02] dark:bg-green-950/[0.05]"
                            )}
                        >
                            <span className={cn("text-[10px] sm:text-xs font-semibold mb-1 block", status.blocked ? "text-red-500/50" : "text-muted-foreground/70")}>{d}</span>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                {status.blocked ? <span className="text-[7px] sm:text-[9px] font-medium text-red-500/40 uppercase tracking-widest leading-none px-1">{status.label}</span> : null}
                                {!status.blocked && (
                                    <div className="w-full mt-auto space-y-1">
                                        <div className="hidden sm:flex flex-col gap-1 w-full">
                                            {morningW && <WorkshopBadge title={morningW.title} color="yellow" status={morningW.status} />}
                                            {afternoonW && <WorkshopBadge title={afternoonW.title} color="orange" status={afternoonW.status} />}
                                            {nightW && <WorkshopBadge title={nightW.title} color="blue" status={nightW.status} />}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TooltipTrigger>
                    {!status.blocked && (
                        <TooltipContent className="w-64 p-3 shadow-xl border border-border bg-popover z-[100]" side="right">
                            <div className="space-y-2">
                                <ShiftPreview label="Mañana" workshop={morningW} icon={Coffee} color="yellow" />
                                <ShiftPreview label="Tarde" workshop={afternoonW} icon={Sun} color="orange" />
                                <ShiftPreview label="Noche" workshop={nightW} icon={Moon} color="blue" />
                            </div>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-background rounded-2xl overflow-hidden border border-border/60">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/50 bg-muted/20">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground uppercase">
                        {monthNames[month]} <span className="text-primary/70">{year}</span>
                    </h2>
                    <div className="flex gap-1.5">
                        <Button variant="outline" size="icon" className="h-8 w-8 border-border/60 hover:bg-accent text-foreground" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-border/60 hover:bg-accent text-foreground" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-background">{days}</div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl p-0 border-none bg-background shadow-2xl rounded-2xl overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            {selectedShift && <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedShift(null)}><ArrowLeft className="h-4 w-4" /></Button>}
                            <span className="capitalize text-foreground">{selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">{!selectedShift ? 'Seleccione un bloque horario.' : 'Complete la información.'}</DialogDescription>
                    </DialogHeader>

                    {!selectedShift ? (
                        <div className="grid gap-3 p-6 pt-4">
                            <ShiftCard label="Mañana" time="07:00 - 12:00" icon={Coffee} color="yellow" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'morning')} onSelect={() => handleShiftSelect('morning')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} />
                            <ShiftCard label="Tarde" time="12:00 - 18:00" icon={Sun} color="orange" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'afternoon')} onSelect={() => handleShiftSelect('afternoon')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} />
                            <ShiftCard label="Noche" time="18:00 - 22:00" icon={Moon} color="blue" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'night')} onSelect={() => handleShiftSelect('night')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} />
                        </div>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="grid gap-4 p-6 pt-4 border-t border-border/40 bg-muted/5">
                            <div className="grid gap-1.5">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Título del Taller</Label>
                                <Input value={data.title} onChange={e => setData('title', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-1.5"><Label className="text-xs font-medium text-muted-foreground ml-1">Representante</Label><Input value={data.representative} onChange={e => setData('representative', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" /></div>
                                <div className="grid gap-1.5"><Label className="text-xs font-medium text-muted-foreground ml-1">Correo</Label><Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" /></div>
                            </div>
                            <div className="grid gap-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Modalidad</Label>
                                <Select value={data.modality} onValueChange={v => setData(d => ({ ...d, modality: v, meeting_link: '', location: '' }))}>
                                    <SelectTrigger className="h-10 bg-background border-border/60 rounded-lg text-sm"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                    <SelectContent><SelectItem value="virtual">Virtual</SelectItem><SelectItem value="presencial">Presencial</SelectItem></SelectContent>
                                </Select>
                                {data.modality === 'virtual' && <Input placeholder="Link de reunión" value={data.meeting_link} onChange={e => setData('meeting_link', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />}
                                {data.modality === 'presencial' && <Input placeholder="Lugar / Aula" value={data.location} onChange={e => setData('location', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />}
                            </div>
                            <Button type="submit" disabled={processing} className="w-full bg-primary text-primary-foreground h-11 rounded-lg font-medium mt-4">
                                {isEditing ? 'Actualizar registro' : 'Confirmar registro'}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

function WorkshopBadge({ title, color, status }: any) {
    const isCompleted = status === 'completed';
    const colors: any = { yellow: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20", orange: "bg-orange-500/10 text-orange-700 border-orange-500/20", blue: "bg-blue-500/10 text-blue-700 border-blue-500/20", green: "bg-green-500/10 text-green-700 border-green-500/20" };
    return <div className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded border truncate flex items-center gap-1", isCompleted ? colors.green : colors[color])}>{isCompleted && <CheckCircle2 className="h-2 w-2" />}{title}</div>;
}

function ShiftPreview({ label, workshop, icon: Icon, color }: any) {
    const colors: any = { yellow: "text-yellow-600 dark:text-yellow-400", orange: "text-orange-600 dark:text-orange-400", blue: "text-blue-600 dark:text-blue-400" };
    return <div className="space-y-1"><span className={cn("text-[9px] font-bold uppercase flex items-center gap-1", colors[color])}><Icon className="h-3 w-3"/> {label}</span><span className="text-[10px] text-muted-foreground block truncate pl-4">{workshop?.title || 'Disponible'}</span></div>;
}

function ShiftCard({ label, time, icon: Icon, color, workshop, onSelect, onComplete, onRelease, onEdit }: any) {
    const isOccupied = !!workshop;
    const isCompleted = workshop?.status === 'completed';
    return (
        <div className={cn("flex items-center justify-between p-4 rounded-xl border transition-all w-full", !isOccupied ? "border-border/60 bg-card hover:bg-muted/30 cursor-pointer" : "bg-muted/40 border-border/40")} onClick={!isOccupied ? onSelect : undefined}>
            <div className="flex items-center gap-4 text-foreground">
                <div className={cn("p-2 rounded-lg bg-background border border-border/40", !isOccupied ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground")}><Icon className="h-5 w-5" /></div>
                <div><span className="text-sm font-semibold block">{label}</span><span className="text-xs text-muted-foreground">{time}</span></div>
            </div>
            <div className="flex items-center gap-2">
                {isOccupied ? (
                    <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="icon" className="h-7 px-2 text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); onEdit(workshop); }}><Edit2 className="h-3.5 w-3.5" /></Button>
                        {isCompleted ? (
                            <><span className="text-[9px] font-bold uppercase bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full border border-green-500/20 flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> FINALIZADO</span><Button variant="ghost" size="sm" className="h-7 px-2 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); onRelease(workshop.id); }}><Trash2 className="h-3.5 w-3.5" /></Button></>
                        ) : (
                            <><span className="text-[9px] font-bold uppercase bg-destructive/10 text-destructive px-2 py-0.5 rounded-full border border-destructive/20 mr-1">Ocupado</span><Button variant="outline" size="sm" className="h-7 text-[10px] font-bold border-primary/20 text-primary hover:bg-primary/5" onClick={(e) => { e.stopPropagation(); onComplete(workshop.id); }}>Finalizar</Button></>
                        )}
                    </div>
                ) : (
                    <span className="text-[9px] font-bold uppercase bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full border border-green-500/20">Libre</span>
                )}
            </div>
        </div>
    );
}
