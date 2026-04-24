import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, ExternalLink, Linkedin, Globe, User, Mail, Clock, MapPin, FolderOpen, Calendar, Contact, Presentation, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Workshop {
    id: number;
    title: string;
    shift_date: string;
    shift_type: string;
    shift_time: string | null;
    representative: string;
    email: string;
    modality: string;
    meeting_link: string | null;
    location: string | null;
    year: number;
    brand: string | null;
    contact_name: string | null;
    contact_position: string | null;
    contact_email_b: string | null;
    contact_email_n: string | null;
    contact_phone: string | null;
    speaker: string | null;
    speaker_linkedin: string | null;
    drive_logo_photo: string | null;
    drive_difusion: string | null;
    inscription_link: string | null;
    inscription_responses: string | null;
    attendees_link: string | null;
    attendee_responses: string | null;
    event_photos: string | null;
    comments: string | null;
    status: string;
    user?: { name: string; };
}

interface Props { workshop: Workshop; }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Talleres', href: '/workshops' },
    { title: 'Detalles', href: '/workshops/' + 1 },
];

const InfoRow = ({ label, value, href }: { label: string; value?: string | null; href?: string }) => {
    if (!value) return null;
    const content = (
        <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            {href ? (
                <a href={href} target="_blank" className="text-sm text-blue-600 hover:underline flex items-center gap-1 truncate max-w-[50%]">
                    {value} <ExternalLink className="h-3 w-3" />
                </a>
            ) : (
                <span className="text-sm font-medium truncate max-w-[50%]">{value}</span>
            )}
        </div>
    );
    return content;
};

export default function Show({ workshop }: Props) {
    const formatDate = (date: string) => new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const shiftLabel = workshop.shift_type === 'morning' ? 'Mañana' : workshop.shift_type === 'afternoon' ? 'Tarde' : 'Noche';

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <Head title={workshop.title} />
            
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/workshops"><ArrowLeft className="h-4 w-4 mr-2" /> Volver</Link>
                </Button>
                <Button asChild>
                    <Link href={`/workshops/duplicate/${workshop.id}`}><Copy className="h-4 w-4 mr-2" /> Duplicar taller</Link>
                </Button>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{shiftLabel}</Badge>
                    <Badge variant="secondary" className="text-xs">{workshop.modality === 'virtual' ? 'Virtual' : 'Presencial'}</Badge>
                    {workshop.year && <Badge variant="outline" className="text-xs">{workshop.year}</Badge>}
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">{workshop.title}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {workshop.shift_date && formatDate(workshop.shift_date)}
                    {workshop.shift_time && <span className="text-muted-foreground/70">• {workshop.shift_time}</span>}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Responsable
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow label="Nombre" value={workshop.representative} />
                        <InfoRow label="Email" value={workshop.email} href={`mailto:${workshop.email}`} />
                        {workshop.modality === 'virtual' && workshop.meeting_link && <InfoRow label="Reunión" value="Unirse" href={workshop.meeting_link} />}
                        {workshop.modality === 'presencial' && workshop.location && <InfoRow label="Ubicación" value={workshop.location} />}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Presentation className="h-4 w-4 text-muted-foreground" />
                            Ponente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow label="Nombre" value={workshop.speaker || '-'} />
                        {workshop.speaker_linkedin && <InfoRow label="LinkedIn" value="Ver perfil" href={workshop.speaker_linkedin} />}
                        <InfoRow label="Marca" value={workshop.brand || '-'} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Contact className="h-4 w-4 text-muted-foreground" />
                            Contacto
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow label="Nombre" value={workshop.contact_name || '-'} />
                        <InfoRow label="Cargo" value={workshop.contact_position || '-'} />
                        <InfoRow label="Email" value={workshop.contact_email_b || '-'} />
                        <InfoRow label="Teléfono" value={workshop.contact_phone || '-'} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Recursos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {workshop.drive_logo_photo && <InfoRow label="Logo/Foto" value="Ver" href={workshop.drive_logo_photo} />}
                        {workshop.drive_difusion && <InfoRow label="Difusión" value="Ver" href={workshop.drive_difusion} />}
                        {workshop.inscription_link && <InfoRow label="Inscripción" value="Ver" href={workshop.inscription_link} />}
                        {workshop.attendees_link && <InfoRow label="Asistencia" value="Ver" href={workshop.attendees_link} />}
                        {!workshop.drive_logo_photo && !workshop.drive_difusion && !workshop.inscription_link && !workshop.attendees_link && (
                            <p className="text-sm text-muted-foreground py-1">Sin recursos</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {workshop.comments && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Comentarios
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{workshop.comments}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

Show.layout = (page: any) => <AppLayout breadcrumbs={breadcrumbs} children={page} />;