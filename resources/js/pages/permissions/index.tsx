import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, UserCog, Save, Lock, Info, CheckCircle2 } from 'lucide-react';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

interface Permission {
    id: number;
    name: string;
    slug: string;
    group: string;
}

interface Props {
    permissions: Record<string, Permission[]>;
    rolesWithPermissions: {
        admin: number[];
        practitioner: number[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Permisos',
        href: '/permissions',
    },
];

export default function PermissionIndex({ permissions = {}, rolesWithPermissions }: Props) {
    useFlashToast();
    
    const [activeRole, setActiveRole] = useState<'admin' | 'practitioner'>('practitioner');
    
    const { data, setData, put, processing } = useForm({
        role: activeRole,
        permissions: rolesWithPermissions?.[activeRole] || [],
    });

    useEffect(() => {
        if (rolesWithPermissions) {
            setData((prev) => ({
                ...prev,
                role: activeRole,
                permissions: rolesWithPermissions[activeRole] || [],
            }));
        }
    }, [activeRole]);

    const handleTogglePermission = (permissionId: number) => {
        const currentIds = [...(data.permissions || [])];
        const index = currentIds.indexOf(permissionId);
        
        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(permissionId);
        }
        
        setData('permissions', currentIds);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        put('/permissions', {
            preserveScroll: true,
        });
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8">
            <Head title="Permisos" />
            
            <form onSubmit={handleSave}>
                {/* Header Estilo Sidebar */}
                <div className="mb-8 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground">Gestión de Accesos</h1>
                        <p className="text-sm text-muted-foreground/80">Configure las capacidades y restricciones del sistema.</p>
                    </div>
                    <Button 
                        type="submit"
                        disabled={processing}
                        size="sm"
                        className="h-9 px-5 font-medium shadow-sm rounded-md transition-all active:scale-95 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    >
                        <Save className={cn("mr-2 h-4 w-4", processing && "animate-spin")} />
                        {processing ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                </div>

                <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as any)} className="space-y-6">
                    {/* Tabs con estilo de navegación */}
                    <div className="bg-muted/50 p-1 rounded-lg border border-border/40 inline-flex">
                        <TabsList className="bg-transparent h-8 gap-1">
                            <TabsTrigger 
                                value="practitioner" 
                                className="h-6 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md font-medium text-xs transition-all"
                            >
                                <UserCog className="mr-2 h-3.5 w-3.5" />
                                Practicante
                            </TabsTrigger>
                            <TabsTrigger 
                                value="admin" 
                                className="h-6 px-4 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-accent-foreground rounded-md font-medium text-xs transition-all"
                            >
                                <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                                Administrador
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Info Card Estilo Sidebar */}
                        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
                            <Card className="border-none bg-muted/30 shadow-none rounded-xl">
                                <CardContent className="p-5 space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                                        <Info className="h-4 w-4 text-primary/60" />
                                        Nivel de acceso
                                    </div>
                                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                                        {activeRole === 'admin' 
                                            ? 'Este perfil dispone de facultades totales sobre la plataforma y configuraciones críticas.'
                                            : 'Perfil destinado a tareas operativas y registro de actividades diarias en los talleres.'}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-medium text-sidebar-foreground/80 bg-background/50 p-2.5 rounded-lg border border-border/40">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        {data.permissions?.length || 0} permisos activos
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-4 bg-primary/[0.02] rounded-xl border border-border/40 flex items-start gap-3">
                                <Lock className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-foreground/90">Seguridad global</p>
                                    <p className="text-xs text-muted-foreground/70 leading-snug">
                                        La actualización se propaga a todos los usuarios del rol seleccionado.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Listado de Permisos Estilo Sidebar Menu */}
                        <div className="lg:col-span-8 space-y-10 order-1 lg:order-2">
                            {Object.entries(permissions).map(([group, groupPermissions]) => (
                                <div key={group} className="space-y-4">
                                    <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.2em] ml-2">
                                        {group}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {groupPermissions.map((permission) => {
                                            const isSelected = data.permissions?.includes(permission.id);
                                            return (
                                                <button
                                                    key={permission.id}
                                                    type="button"
                                                    onClick={() => handleTogglePermission(permission.id)}
                                                    className={cn(
                                                        "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                                        isSelected 
                                                            ? "border-primary/20 bg-primary/[0.02] shadow-xs" 
                                                            : "border-border/50 bg-card hover:bg-muted/40"
                                                    )}
                                                >
                                                    <div className="space-y-0.5 pr-3 pointer-events-none">
                                                        <span className="text-sm font-medium text-foreground block">
                                                            {permission.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground/50 block">
                                                            {permission.slug}
                                                        </span>
                                                    </div>
                                                    <div className={cn(
                                                        "h-4 w-4 rounded border transition-all flex items-center justify-center shrink-0",
                                                        isSelected 
                                                            ? "bg-primary border-primary" 
                                                            : "border-border bg-muted/20"
                                                    )}>
                                                        {isSelected && (
                                                            <div className="h-1 w-1 rounded-full bg-primary-foreground" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </form>
        </div>
    );
}

// @ts-ignore
PermissionIndex.layout = (page: any) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
