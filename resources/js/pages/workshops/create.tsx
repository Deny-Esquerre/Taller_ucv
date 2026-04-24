import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { index as workshopsIndex, store, create as workshopsCreate } from '@/routes/workshops/index';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    users: User[];
    duplicateFrom?: any;
}

export default function Create({ users, duplicateFrom }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    
    const { data, setData, post, processing, errors } = useForm({
        user_id: duplicateFrom?.user_id?.toString() || '',
        title: duplicateFrom?.title || '',
        shift_date: urlParams.get('shift_date') || '',
        shift_type: urlParams.get('shift_type') || duplicateFrom?.shift_type || '',
        shift_time: duplicateFrom?.shift_time || '',
        representative: duplicateFrom?.representative || '',
        email: duplicateFrom?.email || '',
        modality: duplicateFrom?.modality || '',
        year: duplicateFrom?.year || new Date().getFullYear(),
        meeting_link: duplicateFrom?.meeting_link || '',
        location: duplicateFrom?.location || '',
        brand: duplicateFrom?.brand || '',
        contact_name: duplicateFrom?.contact_name || '',
        contact_position: duplicateFrom?.contact_position || '',
        contact_email_b: duplicateFrom?.contact_email_b || '',
        contact_email_n: duplicateFrom?.contact_email_n || '',
        contact_phone: duplicateFrom?.contact_phone || '',
        speaker: duplicateFrom?.speaker || '',
        speaker_linkedin: duplicateFrom?.speaker_linkedin || '',
        drive_logo_photo: duplicateFrom?.drive_logo_photo || '',
        drive_difusion: duplicateFrom?.drive_difusion || '',
        inscription_link: duplicateFrom?.inscription_link || '',
        inscription_responses: duplicateFrom?.inscription_responses || '',
        attendees_link: duplicateFrom?.attendees_link || '',
        attendee_responses: duplicateFrom?.attendee_responses || '',
        event_photos: duplicateFrom?.event_photos || '',
        comments: duplicateFrom?.comments || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url, {
            onSuccess: () => {
                // El middleware manejará la redirección y el mensaje
            }
        });
    };

    return (
        <>
            <Head title="Crear Taller" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href={workshopsIndex().url}>
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">Crear Taller</h1>
                            <p className="text-sm text-muted-foreground">
                                Completa la información para registrar la actividad.
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="shadow-md">
                    <CardHeader className="border-b bg-muted/10">
                        <CardTitle className="text-lg">Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="user_id">Usuario Asignado</Label>
                                    <Select value={data.user_id} onValueChange={(value: string) => setData('user_id', value)}>
                                        <SelectTrigger id="user_id" className="w-full">
                                            <SelectValue placeholder="Selecciona un usuario" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.user_id && <p className="text-xs font-medium text-destructive">{errors.user_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Año Académico</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', parseInt(e.target.value))}
                                        min="2000"
                                    />
                                    {errors.year && <p className="text-xs font-medium text-destructive">{errors.year}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Título del Taller</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ej: Taller de Introducción a la Programación"
                                    className="h-11"
                                />
                                {errors.title && <p className="text-xs font-medium text-destructive">{errors.title}</p>}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="shift_date">Fecha Programada</Label>
                                    <Input
                                        id="shift_date"
                                        type="date"
                                        value={data.shift_date}
                                        onChange={(e) => setData('shift_date', e.target.value)}
                                    />
                                    {errors.shift_date && <p className="text-xs font-medium text-destructive">{errors.shift_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="shift_type">Turno</Label>
                                    <Select value={data.shift_type} onValueChange={(value: string) => setData('shift_type', value)}>
                                        <SelectTrigger id="shift_type">
                                            <SelectValue placeholder="Selecciona el turno" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="morning">Mañana</SelectItem>
                                            <SelectItem value="afternoon">Tarde</SelectItem>
                                            <SelectItem value="night">Noche</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.shift_type && <p className="text-xs font-medium text-destructive">{errors.shift_type}</p>}
                                </div>
                            </div>

                            <div className="separator my-2 border-t" />

                            <div className="space-y-2">
                                <Label htmlFor="representative">Representante Responsable</Label>
                                <Input
                                    id="representative"
                                    value={data.representative}
                                    onChange={(e) => setData('representative', e.target.value)}
                                    placeholder="Nombre completo"
                                />
                                {errors.representative && <p className="text-xs font-medium text-destructive">{errors.representative}</p>}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo de Contacto</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="correo@ucv.edu.pe"
                                    />
                                    {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="modality">Modalidad</Label>
                                    <Select value={data.modality} onValueChange={(value: string) => setData('modality', value)}>
                                        <SelectTrigger id="modality">
                                            <SelectValue placeholder="Selecciona" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="virtual">Virtual</SelectItem>
                                            <SelectItem value="presencial">Presencial</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.modality && <p className="text-xs font-medium text-destructive">{errors.modality}</p>}
                                </div>
                            </div>

                            {data.modality === 'virtual' && (
                                <div className="space-y-2">
                                    <Label htmlFor="meeting_link">Enlace de Reunión (Zoom/Meet)</Label>
                                    <Input
                                        id="meeting_link"
                                        value={data.meeting_link}
                                        onChange={(e) => setData('meeting_link', e.target.value)}
                                        placeholder="https://zoom.us/j/..."
                                    />
                                    {errors.meeting_link && <p className="text-xs font-medium text-destructive">{errors.meeting_link}</p>}
                                </div>
                            )}

{data.modality === 'presencial' && (
                                <div className="space-y-2">
                                    <Label htmlFor="location">Ubicación / Aula</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Ej: Auditorium A, Aula 302..."
                                    />
                                    {errors.location && <p className="text-xs font-medium text-destructive">{errors.location}</p>}
                                </div>
                            )}

                            <div className="separator my-2 border-t" />

                            <CardHeader className="border-b bg-muted/10 -mx-6 -mt-6 px-6 py-3">
                                <CardTitle className="text-lg">Datos del Ponente</CardTitle>
                            </CardHeader>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="speaker">Nombre del Ponente</Label>
                                    <Input
                                        id="speaker"
                                        value={data.speaker}
                                        onChange={(e) => setData('speaker', e.target.value)}
                                        placeholder="Nombre completo"
                                    />
                                    {errors.speaker && <p className="text-xs font-medium text-destructive">{errors.speaker}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="speaker_linkedin">Perfil LinkedIn</Label>
                                    <Input
                                        id="speaker_linkedin"
                                        value={data.speaker_linkedin}
                                        onChange={(e) => setData('speaker_linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                    {errors.speaker_linkedin && <p className="text-xs font-medium text-destructive">{errors.speaker_linkedin}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Marca / Empresa</Label>
                                    <Input
                                        id="brand"
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        placeholder="Empresa o marca"
                                    />
                                    {errors.brand && <p className="text-xs font-medium text-destructive">{errors.brand}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="shift_time">Hora del Taller</Label>
                                    <Input
                                        id="shift_time"
                                        type="time"
                                        value={data.shift_time}
                                        onChange={(e) => setData('shift_time', e.target.value)}
                                    />
                                    {errors.shift_time && <p className="text-xs font-medium text-destructive">{errors.shift_time}</p>}
                                </div>
                            </div>

                            <div className="separator my-2 border-t" />

                            <CardHeader className="border-b bg-muted/10 -mx-6 px-6 py-3">
                                <CardTitle className="text-lg">Datos de Contacto</CardTitle>
                            </CardHeader>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact_name">Nombre de Contacto</Label>
                                    <Input
                                        id="contact_name"
                                        value={data.contact_name}
                                        onChange={(e) => setData('contact_name', e.target.value)}
                                        placeholder="Nombre completo"
                                    />
                                    {errors.contact_name && <p className="text-xs font-medium text-destructive">{errors.contact_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_position">Cargo</Label>
                                    <Input
                                        id="contact_position"
                                        value={data.contact_position}
                                        onChange={(e) => setData('contact_position', e.target.value)}
                                        placeholder="Cargo o posición"
                                    />
                                    {errors.contact_position && <p className="text-xs font-medium text-destructive">{errors.contact_position}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact_email_b">Correo Bisnis</Label>
                                    <Input
                                        id="contact_email_b"
                                        type="email"
                                        value={data.contact_email_b}
                                        onChange={(e) => setData('contact_email_b', e.target.value)}
                                        placeholder="correo@empresa.com"
                                    />
                                    {errors.contact_email_b && <p className="text-xs font-medium text-destructive">{errors.contact_email_b}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_email_n">Correo Personal</Label>
                                    <Input
                                        id="contact_email_n"
                                        type="email"
                                        value={data.contact_email_n}
                                        onChange={(e) => setData('contact_email_n', e.target.value)}
                                        placeholder="correo@personal.com"
                                    />
                                    {errors.contact_email_n && <p className="text-xs font-medium text-destructive">{errors.contact_email_n}</p>}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Label htmlFor="contact_phone">Teléfono</Label>
                                <Input
                                    id="contact_phone"
                                    value={data.contact_phone}
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                    placeholder="+51 999 999 999"
                                />
                                {errors.contact_phone && <p className="text-xs font-medium text-destructive">{errors.contact_phone}</p>}
                            </div>

                            <div className="separator my-2 border-t" />

                            <CardHeader className="border-b bg-muted/10 -mx-6 px-6 py-3">
                                <CardTitle className="text-lg">Recursos</CardTitle>
                            </CardHeader>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="drive_logo_photo">Drive Logo/Foto</Label>
                                    <Input
                                        id="drive_logo_photo"
                                        value={data.drive_logo_photo}
                                        onChange={(e) => setData('drive_logo_photo', e.target.value)}
                                        placeholder="Enlace Drive"
                                    />
                                    {errors.drive_logo_photo && <p className="text-xs font-medium text-destructive">{errors.drive_logo_photo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="drive_difusion">Drive Difusión</Label>
                                    <Input
                                        id="drive_difusion"
                                        value={data.drive_difusion}
                                        onChange={(e) => setData('drive_difusion', e.target.value)}
                                        placeholder="Enlace Drive"
                                    />
                                    {errors.drive_difusion && <p className="text-xs font-medium text-destructive">{errors.drive_difusion}</p>}
                                </div>
                            </div>

                            <div className="separator my-2 border-t" />

                            <CardHeader className="border-b bg-muted/10 -mx-6 px-6 py-3">
                                <CardTitle className="text-lg">Inscripción y Asistencia</CardTitle>
                            </CardHeader>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="inscription_link">Enlace de Inscripción</Label>
                                    <Input
                                        id="inscription_link"
                                        value={data.inscription_link}
                                        onChange={(e) => setData('inscription_link', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {errors.inscription_link && <p className="text-xs font-medium text-destructive">{errors.inscription_link}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="inscription_responses">Inscripción - Respuestas</Label>
                                    <Input
                                        id="inscription_responses"
                                        value={data.inscription_responses}
                                        onChange={(e) => setData('inscription_responses', e.target.value)}
                                        placeholder="Enlace Drive"
                                    />
                                    {errors.inscription_responses && <p className="text-xs font-medium text-destructive">{errors.inscription_responses}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="attendees_link">Enlace de Asistencia</Label>
                                    <Input
                                        id="attendees_link"
                                        value={data.attendees_link}
                                        onChange={(e) => setData('attendees_link', e.target.value)}
                                        placeholder="https://..."
                                    />
                                    {errors.attendees_link && <p className="text-xs font-medium text-destructive">{errors.attendees_link}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="attendee_responses">Asistencia - Respuestas</Label>
                                    <Input
                                        id="attendee_responses"
                                        value={data.attendee_responses}
                                        onChange={(e) => setData('attendee_responses', e.target.value)}
                                        placeholder="Enlace Drive"
                                    />
                                    {errors.attendee_responses && <p className="text-xs font-medium text-destructive">{errors.attendee_responses}</p>}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Label htmlFor="event_photos">Fotos del Evento</Label>
                                <Input
                                    id="event_photos"
                                    value={data.event_photos}
                                    onChange={(e) => setData('event_photos', e.target.value)}
                                    placeholder="Enlace Drive"
                                />
                                {errors.event_photos && <p className="text-xs font-medium text-destructive">{errors.event_photos}</p>}
                            </div>

                            <div className="space-y-2 pt-4">
                                <Label htmlFor="comments">Comentarios</Label>
                                <textarea
                                    id="comments"
                                    value={data.comments}
                                    onChange={(e) => setData('comments', e.target.value)}
                                    placeholder="Observaciones adicionales..."
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {errors.comments && <p className="text-xs font-medium text-destructive">{errors.comments}</p>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t mt-4">
                                <Button variant="ghost" asChild>
                                    <Link href={workshopsIndex().url}>Cancelar</Link>
                                </Button>
                                <Button type="submit" size="lg" disabled={processing} className="px-8">
                                    {processing ? 'Guardando...' : 'Registrar Taller'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}