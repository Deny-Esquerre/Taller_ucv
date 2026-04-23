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
        representative: duplicateFrom?.representative || '',
        email: duplicateFrom?.email || '',
        modality: duplicateFrom?.modality || '',
        year: duplicateFrom?.year || new Date().getFullYear(),
        meeting_link: duplicateFrom?.meeting_link || '',
        location: duplicateFrom?.location || '',
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
                                        placeholder="Ej: Auditorio A, Aula 302..."
                                    />
                                    {errors.location && <p className="text-xs font-medium text-destructive">{errors.location}</p>}
                                </div>
                            )}

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