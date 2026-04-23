import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Copy, Eye, MoreHorizontal, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Workshop {
    id: number;
    title: string;
    shift_date: string;
    shift_type: string;
    representative: string;
    modality: string;
    user?: {
        name: string;
    };
}

interface Props {
    workshops: Workshop[];
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Talleres', href: '/workshops' },
    { title: 'Historial', href: '/workshops/history' },
];

export default function History({ workshops = [], filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/workshops/history', { search }, { preserveState: true });
    };

    const getModalityBadge = (modality: string) => {
        return modality === 'virtual' 
            ? <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Virtual</Badge>
            : <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">Presencial</Badge>;
    };

    const getShiftLabel = (type: string) => {
        const labels: any = { morning: 'Mañana', afternoon: 'Tarde', night: 'Noche' };
        return labels[type] || type;
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <Head title="Historial de Talleres" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Historial de Talleres</h1>
                    <p className="text-muted-foreground text-sm">Visualiza y reutiliza registros de talleres anteriores.</p>
                </div>
                
                <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar taller..."
                            className="pl-9 h-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="secondary" className="h-10">Buscar</Button>
                </form>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="font-bold">Taller / Actividad</TableHead>
                            <TableHead className="font-bold">Fecha y Turno</TableHead>
                            <TableHead className="font-bold">Responsable</TableHead>
                            <TableHead className="font-bold text-center">Modalidad</TableHead>
                            <TableHead className="font-bold text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workshops.length > 0 ? (
                            workshops.map((workshop) => (
                                <TableRow key={workshop.id} className="hover:bg-muted/20 transition-colors">
                                    <TableCell>
                                        <div className="font-medium text-foreground">{workshop.title}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                            <User className="h-3 w-3" /> {workshop.user?.name || 'Sistema'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium">{new Date(workshop.shift_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                        <div className="text-xs text-muted-foreground capitalize">{getShiftLabel(workshop.shift_type)}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{workshop.representative}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getModalityBadge(workshop.modality)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Ver detalles" asChild>
                                                <Link href={`/workshops/${workshop.id}`}>
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-primary/20 text-primary hover:bg-primary/5" asChild>
                                                <Link href={`/workshops/duplicate/${workshop.id}`}>
                                                    <Copy className="h-3.5 w-3.5" />
                                                    Duplicar
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No se encontraron talleres en el historial.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

// @ts-ignore
History.layout = (page: any) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
