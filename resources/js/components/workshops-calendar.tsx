import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon, Coffee, ArrowLeft, Clock, MapPin, Globe, Info, Link as LinkIcon, CheckCircle2, Trash2, Edit2, Eye, User, Presentation, Contact, FileText, Copy, X } from 'lucide-react';
import { useForm, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    shift_time?: string;
    brand?: string;
    contact_name?: string;
    contact_position?: string;
    contact_email_b?: string;
    contact_email_n?: string;
    contact_phone?: string;
    speaker?: string;
    speaker_linkedin?: string;
    drive_logo_photo?: string;
    drive_difusion?: string;
    inscription_link?: string;
    inscription_responses?: string;
    attendees_link?: string;
    attendee_responses?: string;
    event_photos?: string;
    comments?: string;
    year?: number;
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
    const [viewingWorkshop, setViewingWorkshop] = useState<Workshop | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: authUser?.id?.toString() || '',
        title: '',
        shift_date: '',
        shift_type: '',
        shift_time: '',
        representative: '',
        email: '',
        modality: '',
        meeting_link: '',
        location: '',
        year: new Date().getFullYear(),
        brand: '',
        contact_name: '',
        contact_position: '',
        contact_email_b: '',
        contact_email_n: '',
        contact_phone: '',
        speaker: '',
        speaker_linkedin: '',
        drive_logo_photo: '',
        drive_difusion: '',
        inscription_link: '',
        inscription_responses: '',
        attendees_link: '',
        attendee_responses: '',
        event_photos: '',
        comments: '',
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
        const dateString = date.toISOString().split('T')[0];
        const status = getDayStatus(date);
        
        if (status.blocked) return;
        
        setSelectedDate(date);
        setSelectedShift(null);
        setIsEditing(false);
        setEditingWorkshopId(null);
        reset({
            user_id: authUser.id.toString(),
            title: '',
            shift_date: dateString,
            shift_type: '',
            shift_time: '',
            representative: '',
            email: '',
            modality: '',
            meeting_link: '',
            location: '',
            year: new Date().getFullYear(),
            brand: '',
            contact_name: '',
            contact_position: '',
            contact_email_b: '',
            contact_email_n: '',
            contact_phone: '',
            speaker: '',
            speaker_linkedin: '',
            drive_logo_photo: '',
            drive_difusion: '',
            inscription_link: '',
            inscription_responses: '',
            attendees_link: '',
            attendee_responses: '',
            event_photos: '',
            comments: '',
        });
        setIsDialogOpen(true);
    };

    const handleShiftSelect = (type: 'morning' | 'afternoon' | 'night') => {
        setSelectedShift(type);
        setData('shift_type', type);
        setIsEditing(false);
    };

const handleEditWorkshop = (workshop: Workshop) => {
        setSelectedDate(new Date(workshop.shift_date));
        setSelectedShift(workshop.shift_type);
        setIsEditing(true);
        setEditingWorkshopId(workshop.id);
        setData({
            user_id: authUser.id.toString(),
            title: workshop.title,
            shift_date: workshop.shift_date.split('T')[0],
            shift_type: workshop.shift_type,
            shift_time: (workshop as any).shift_time || '',
            representative: workshop.representative || '',
            email: workshop.email || '',
            modality: workshop.modality || '',
            meeting_link: workshop.meeting_link || '',
            location: workshop.location || '',
            year: new Date().getFullYear(),
            brand: (workshop as any).brand || '',
            contact_name: (workshop as any).contact_name || '',
            contact_position: (workshop as any).contact_position || '',
            contact_email_b: (workshop as any).contact_email_b || '',
            contact_email_n: (workshop as any).contact_email_n || '',
            contact_phone: (workshop as any).contact_phone || '',
            speaker: (workshop as any).speaker || '',
            speaker_linkedin: (workshop as any).speaker_linkedin || '',
            drive_logo_photo: (workshop as any).drive_logo_photo || '',
            drive_difusion: (workshop as any).drive_difusion || '',
            inscription_link: (workshop as any).inscription_link || '',
            inscription_responses: (workshop as any).inscription_responses || '',
            attendees_link: (workshop as any).attendees_link || '',
            attendee_responses: (workshop as any).attendee_responses || '',
            event_photos: (workshop as any).event_photos || '',
            comments: (workshop as any).comments || '',
        });
    };

    const handleCompleteWorkshop = (id: number) => {
        router.put(`/workshops/${id}/complete`, {}, {
            onSuccess: () => setIsDialogOpen(false)
        });
    };

    const handleViewWorkshop = (workshop: Workshop) => {
        setViewingWorkshop(workshop);
        setIsViewDialogOpen(true);
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
        
        const formData = {
            ...data,
            user_id: authUser.id.toString(),
            year: parseInt(data.year) || new Date().getFullYear(),
            shift_date: data.shift_date || (selectedDate ? selectedDate.toISOString().split('T')[0] : ''),
        };
        
        // Debug: ensure shift_type is also set
        if (!formData.shift_type) {
            console.warn('ADVERTENCIA: shift_type no está establecido');
        }
        if (!formData.shift_date) {
            console.warn('ADVERTENCIA: shift_date no está establecido');
        }
        
        console.log('Enviando datos:', JSON.stringify(formData, null, 2));
        console.log('URL:', workshopsStore().url);
        console.log('Auth user ID:', authUser.id);
        console.log('selectedDate:', selectedDate?.toISOString());
        console.log('data.shift_date:', data.shift_date);
        
        if (isEditing && editingWorkshopId) {
            router.put(`/workshops/${editingWorkshopId}`, formData, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setIsEditing(false);
                    window.location.reload();
                },
                onError: (errors: any) => {
                    console.error('Error al actualizar:', errors);
                    alert('Error: ' + JSON.stringify(errors));
                }
            });
            return;
        }

        fetch(workshopsStore().url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(async res => {
            const data = await res.json();
            console.log('Respuesta:', res.status, data);
            
            if (!res.ok) {
                const errorMsg = data.errors ? Object.values(data.errors).flat().join(', ') : (data.message || 'Error ' + res.status);
                throw new Error(errorMsg);
            }
            
            console.log('Taller guardado exitosamente:', data);
            
            const formattedDate = formData.shift_date && formData.shift_date.includes('-') 
                ? new Date(formData.shift_date + 'T00:00:00').toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'long'
                })
                : 'la fecha seleccionada';

            console.log('Enviando notificación...', authUser.name, formData.title);
            try {
                sendNotification(
                    'Taller Registrado',
                    `${authUser.name} agregó el taller "${formData.title}" para el día ${formattedDate}`
                );
                setTimeout(() => {
                    setIsDialogOpen(false);
                    reset();
                    window.location.reload();
                }, 2000);
            } catch (e) {
                setIsDialogOpen(false);
                reset();
                window.location.reload();
            }
            return;
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error: ' + err.message);
        });
    };

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`pad-${i}`} className="h-16 sm:h-36 border border-border bg-muted/10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const status = getDayStatus(date);
        const dailyWorkshops = getWorkshopsForDate(date);
        const morningW = dailyWorkshops.find(w => w.shift_type === 'morning');
        const afternoonW = dailyWorkshops.find(w => w.shift_type === 'afternoon');
        const nightW = dailyWorkshops.find(w => w.shift_type === 'night');
        const dayNames = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
        const dayName = dayNames[date.getDay()];

        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

        days.push(
            <TooltipProvider key={d} delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            onClick={() => handleDateClick(date)}
                            className={cn(
                                "relative h-20 sm:h-40 border border-border p-1 sm:p-2 transition-all flex flex-col items-stretch overflow-hidden group",
                                status.blocked ? "bg-red-500/10 hover:bg-red-500/20 border-red-400 dark:border-red-700 cursor-not-allowed opacity-80" : 
                                isWeekend ? "bg-red-500/5 hover:bg-red-500/10 cursor-pointer" : "cursor-pointer hover:bg-muted/40 bg-background",
                                status.type === 'enabled' && "bg-green-500/[0.03] dark:bg-green-950/[0.05]"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={cn("text-[12px] sm:text-sm font-extrabold block", status.blocked ? "text-red-600 dark:text-red-400" : isWeekend ? "text-red-400/60" : "text-muted-foreground/70")}>{d}</span>
                                <span className={cn("text-[9px] sm:text-[10px] font-black uppercase", status.blocked ? "text-red-500/80" : isWeekend ? "text-red-400/50" : "text-muted-foreground/40")}>{dayName}</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-start text-center pt-1">
                                {status.blocked ? <span className="text-[7px] sm:text-[9px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest leading-none px-1">{status.label}</span> : null}
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
                        <TooltipContent className="w-72 p-3 shadow-xl border border-border bg-popover z-[100]" side="right">
                            <div className="space-y-2">
                                <ShiftPreview label="Mañana" workshop={morningW} icon={Coffee} color="yellow" onView={handleViewWorkshop} />
                                <ShiftPreview label="Tarde" workshop={afternoonW} icon={Sun} color="orange" onView={handleViewWorkshop} />
                                <ShiftPreview label="Noche" workshop={nightW} icon={Moon} color="blue" onView={handleViewWorkshop} />
                            </div>
                            <p className="text-[9px] text-muted-foreground text-center mt-2 pt-1 border-t border-border/30">Clic en el título para ver detalles</p>
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
                <DialogContent className="sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none bg-background shadow-2xl rounded-2xl">
                    <DialogHeader className="p-4 sm:p-6 pb-0 shrink-0">
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            {selectedShift && <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedShift(null)}><ArrowLeft className="h-4 w-4" /></Button>}
                            <span className="capitalize text-foreground">{selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">{!selectedShift ? 'Seleccione un bloque horario.' : 'Complete la información.'}</DialogDescription>
                    </DialogHeader>

                    {!selectedShift ? (
                        <div className="grid gap-3 p-6 pt-4">
                            <ShiftCard label="Mañana" time="07:00 - 12:00" icon={Coffee} color="yellow" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'morning')} onSelect={() => handleShiftSelect('morning')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} onView={handleViewWorkshop} />
                            <ShiftCard label="Tarde" time="12:00 - 18:00" icon={Sun} color="orange" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'afternoon')} onSelect={() => handleShiftSelect('afternoon')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} onView={handleViewWorkshop} />
                            <ShiftCard label="Noche" time="18:00 - 22:00" icon={Moon} color="blue" workshop={getWorkshopsForDate(selectedDate!).find(w => w.shift_type === 'night')} onSelect={() => handleShiftSelect('night')} onComplete={handleCompleteWorkshop} onRelease={handleReleaseBlock} onEdit={handleEditWorkshop} onView={handleViewWorkshop} />
                        </div>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)] p-4 sm:p-6 border-t border-border/40 bg-muted/5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Título - ocupa todo el ancho */}
                                <div className="col-span-1 sm:col-span-2 grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Título del Taller</Label>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                
                                {/* Representante y Correo */}
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Representante</Label>
                                    <Input value={data.representative} onChange={e => setData('representative', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Correo</Label>
                                    <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                
                                {/* Modalidad y Año */}
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Modalidad</Label>
                                    <Select value={data.modality} onValueChange={v => setData(d => ({ ...d, modality: v, meeting_link: '', location: '' }))}>
                                        <SelectTrigger className="h-10 bg-background border-border/60 rounded-lg text-sm"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                                        <SelectContent><SelectItem value="virtual">Virtual</SelectItem><SelectItem value="presencial">Presencial</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Año</Label>
                                    <Input type="number" value={data.year} onChange={e => setData('year', parseInt(e.target.value))} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                
                                {/* Link reunión o Lugar según modalidad */}
                                {data.modality === 'virtual' && (
                                    <div className="col-span-1 sm:col-span-2 grid gap-1.5">
                                        <Label className="text-xs font-medium text-muted-foreground ml-1">Link de Reunión</Label>
                                        <Input placeholder="https://zoom.us/j/..." value={data.meeting_link} onChange={e => setData('meeting_link', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                    </div>
                                )}
                                {data.modality === 'presencial' && (
                                    <div className="col-span-1 sm:col-span-2 grid gap-1.5">
                                        <Label className="text-xs font-medium text-muted-foreground ml-1">Ubicación / Aula</Label>
                                        <Input placeholder="Auditorio A, Aula 302..." value={data.location} onChange={e => setData('location', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Datos del Ponente */}
                            <div className="border-t border-border/40 pt-4 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Datos del Ponente</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Ponente</Label>
                                    <Input value={data.speaker} onChange={e => setData('speaker', e.target.value)} placeholder="Nombre del ponente" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">LinkedIn</Label>
                                    <Input value={data.speaker_linkedin} onChange={e => setData('speaker_linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Marca/Empresa</Label>
                                    <Input value={data.brand} onChange={e => setData('brand', e.target.value)} placeholder="Empresa" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Hora</Label>
                                    <Input type="time" value={data.shift_time} onChange={e => setData('shift_time', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                            </div>
                            
                            {/* Datos de Contacto */}
                            <div className="border-t border-border/40 pt-4 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Datos de Contacto</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Nombre Contacto</Label>
                                    <Input value={data.contact_name} onChange={e => setData('contact_name', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Cargo</Label>
                                    <Input value={data.contact_position} onChange={e => setData('contact_position', e.target.value)} className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Teléfono</Label>
                                    <Input value={data.contact_phone} onChange={e => setData('contact_phone', e.target.value)} placeholder="+51 999 999 999" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                            </div>
                            
                            {/* Recursos */}
                            <div className="border-t border-border/40 pt-4 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Recursos</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Drive Logo/Foto</Label>
                                    <Input value={data.drive_logo_photo} onChange={e => setData('drive_logo_photo', e.target.value)} placeholder="Enlace Drive" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Drive Difusión</Label>
                                    <Input value={data.drive_difusion} onChange={e => setData('drive_difusion', e.target.value)} placeholder="Enlace Drive" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                            </div>
                            
                            {/* Inscripción */}
                            <div className="border-t border-border/40 pt-4 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Inscripción</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Link Inscripción</Label>
                                    <Input value={data.inscription_link} onChange={e => setData('inscription_link', e.target.value)} placeholder="https://..." className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Respuestas</Label>
                                    <Input value={data.inscription_responses} onChange={e => setData('inscription_responses', e.target.value)} placeholder="Enlace Drive" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                            </div>
                            
                            {/* Asistencia */}
                            <div className="border-t border-border/40 pt-4 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Asistencia</Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Link Asistencia</Label>
                                    <Input value={data.attendees_link} onChange={e => setData('attendees_link', e.target.value)} placeholder="https://..." className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Respuestas</Label>
                                    <Input value={data.attendee_responses} onChange={e => setData('attendee_responses', e.target.value)} placeholder="Enlace Drive" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                                </div>
                            </div>
                            
                            {/* Fotos del Evento */}
                            <div className="grid gap-1.5 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Fotos del Evento</Label>
                                <Input value={data.event_photos} onChange={e => setData('event_photos', e.target.value)} placeholder="Enlace Drive" className="h-10 bg-background border-border/60 rounded-lg text-sm" />
                            </div>
                            
                            {/* Comentarios */}
                            <div className="grid gap-1.5 mt-4">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Comentarios</Label>
                                <textarea value={data.comments} onChange={e => setData('comments', e.target.value)} placeholder="Observaciones..." className="flex min-h-[60px] w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm" />
                            </div>
                            
                            <Button type="submit" disabled={processing} className="w-full bg-primary text-primary-foreground h-11 rounded-lg font-medium mt-6">
                                {isEditing ? 'Actualizar registro' : 'Confirmar registro'}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="!max-w-[95vw] !max-h-[95vh] !w-full overflow-hidden flex flex-col !p-0 !border-none !bg-background !shadow-2xl !rounded-xl">
                    {viewingWorkshop && (
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b shrink-0">
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-xs">{viewingWorkshop.shift_type === 'morning' ? 'Mañana' : viewingWorkshop.shift_type === 'afternoon' ? 'Tarde' : 'Noche'}</Badge>
                                        <Badge variant="secondary" className="text-xs">{viewingWorkshop.modality === 'virtual' ? 'Virtual' : 'Presencial'}</Badge>
                                    </div>
                                    <p className="text-lg font-semibold truncate">{viewingWorkshop.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {viewingWorkshop.shift_date && new Date(viewingWorkshop.shift_date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        {viewingWorkshop.shift_time && <span> • {viewingWorkshop.shift_time}</span>}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button asChild><Link href={`/workshops/duplicate/${viewingWorkshop.id}`}><Copy className="h-4 w-4 mr-2" /> Duplicar</Link></Button>
                                    <Button variant="ghost" size="icon" onClick={() => setIsViewDialogOpen(false)} className="h-8 w-8"><X className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                Responsable
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1 text-sm">
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Nombre</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.representative}</span></div>
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Email</span><a href={`mailto:${viewingWorkshop.email}`} className="font-medium truncate max-w-[50%] text-blue-600 hover:underline">{viewingWorkshop.email}</a></div>
                                            {viewingWorkshop.modality === 'virtual' && viewingWorkshop.meeting_link && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Reunión</span><a href={viewingWorkshop.meeting_link} className="font-medium text-blue-600 hover:underline">Unirse</a></div>}
                                            {viewingWorkshop.modality === 'presencial' && viewingWorkshop.location && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Ubicación</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.location}</span></div>}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                <Presentation className="h-4 w-4 text-muted-foreground" />
                                                Ponente
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1 text-sm">
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Nombre</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.speaker || '-'}</span></div>
                                            {viewingWorkshop.speaker_linkedin && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">LinkedIn</span><a href={viewingWorkshop.speaker_linkedin} className="font-medium text-blue-600 hover:underline">Ver perfil</a></div>}
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Marca</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.brand || '-'}</span></div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                <Contact className="h-4 w-4 text-muted-foreground" />
                                                Contacto
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1 text-sm">
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Nombre</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.contact_name || '-'}</span></div>
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Cargo</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.contact_position || '-'}</span></div>
                                            <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Email</span><span className="font-medium truncate max-w-[50%]">{viewingWorkshop.contact_email_b || '-'}</span></div>
                                            <div className="flex justify-between py-1"><span className="text-muted-foreground">Teléfono</span><span className="font-medium">{viewingWorkshop.contact_phone || '-'}</span></div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                Recursos
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-1 text-sm">
                                            {viewingWorkshop.drive_logo_photo && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Logo/Foto</span><a href={viewingWorkshop.drive_logo_photo} className="font-medium text-blue-600 hover:underline">Ver</a></div>}
                                            {viewingWorkshop.drive_difusion && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Difusión</span><a href={viewingWorkshop.drive_difusion} className="font-medium text-blue-600 hover:underline">Ver</a></div>}
                                            {viewingWorkshop.inscription_link && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Inscripción</span><a href={viewingWorkshop.inscription_link} className="font-medium text-blue-600 hover:underline">Ver</a></div>}
                                            {viewingWorkshop.attendees_link && <div className="flex justify-between py-1 border-b border-border/50"><span className="text-muted-foreground">Asistencia</span><a href={viewingWorkshop.attendees_link} className="font-medium text-blue-600 hover:underline">Ver</a></div>}
                                            {!viewingWorkshop.drive_logo_photo && !viewingWorkshop.drive_difusion && !viewingWorkshop.inscription_link && !viewingWorkshop.attendees_link && <p className="text-sm text-muted-foreground py-1">Sin recursos</p>}
                                        </CardContent>
                                    </Card>
                                </div>
                                {viewingWorkshop.comments && (
                                    <Card className="mt-4">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-sm font-medium">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                Comentarios
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{viewingWorkshop.comments}</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
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

function ShiftPreview({ label, workshop, icon: Icon, color, onView }: any) {
    const colors: any = { yellow: "text-yellow-600 dark:text-yellow-400", orange: "text-orange-600 dark:text-orange-400", blue: "text-blue-600 dark:text-blue-400" };
    if (!workshop) {
        return <div className="space-y-1">
            <span className={cn("text-[9px] font-bold uppercase flex items-center gap-1", colors[color])}><Icon className="h-3 w-3"/> {label}</span>
            <span className="text-[10px] text-muted-foreground block truncate pl-4">Disponible</span>
        </div>;
    }
    return (
        <div className="space-y-1 cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded" onClick={() => onView && onView(workshop)}>
            <span className={cn("text-[9px] font-bold uppercase flex items-center gap-1", colors[color])}><Icon className="h-3 w-3"/> {label}</span>
            <span className="text-[10px] text-foreground block truncate pl-4 font-medium">{workshop.title}</span>
            <div className="text-[9px] text-muted-foreground pl-4 flex items-center gap-1">
                {workshop.representative} • {workshop.modality === 'virtual' ? 'Virtual' : 'Presencial'}
            </div>
        </div>
    );
}

function ShiftCard({ label, time, icon: Icon, color, workshop, onSelect, onComplete, onRelease, onEdit, onView }: any) {
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
                        <Button variant="ghost" size="icon" className="h-7 px-2 text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); onView(workshop); }} title="Ver detalles"><Eye className="h-3.5 w-3.5" /></Button>
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
