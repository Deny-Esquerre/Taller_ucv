import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, UserPlus, Mail, ShieldAlert, UserCog, Calendar, MoreHorizontal } from 'lucide-react';
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { store as userStore, update as userUpdate, destroy as userDestroy } from '@/routes/users/index';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'practitioner';
    created_at: string;
}

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/users',
    },
];

export default function UserIndex({ users }: Props) {
    useFlashToast();
    
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'practitioner' as const,
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'practitioner' as const,
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating user with data:', createForm.data);
        createForm.post('/users');
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role: user.role,
        });
        setIsEditOpen(true);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        
        editForm.put(`/users/${selectedUser.id}`, {
            onSuccess: () => {
                setIsEditOpen(false);
                editForm.reset();
                window.location.reload();
            },
        });
    };

    const { delete: destroyAction } = useForm();

    const handleDelete = (id: number) => {
        destroyAction(`/users/${id}`, { 
            _method: 'DELETE',
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 py-6 sm:px-6 sm:py-8">
            <Head title="Personal" />
            
            {/* Header Estilo Sidebar */}
            <div className="mb-8 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">Gestión de Personal</h1>
                    <p className="text-sm text-muted-foreground/80">Administración de cuentas y niveles de acceso institucional.</p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    size="sm"
                    className="h-9 px-5 font-medium shadow-sm rounded-md transition-all active:scale-95 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Añadir integrante
                </Button>
            </div>

            <div className="relative overflow-hidden bg-background">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-border/40">
                                <TableHead className="h-10 text-xs font-medium uppercase tracking-wider text-muted-foreground/60 pl-2">Integrante</TableHead>
                                <TableHead className="h-10 text-xs font-medium uppercase tracking-wider text-muted-foreground/60 hidden md:table-cell">Acceso</TableHead>
                                <TableHead className="h-10 text-xs font-medium uppercase tracking-wider text-muted-foreground/60 hidden lg:table-cell text-center">Alta</TableHead>
                                <TableHead className="h-10 text-right pr-2">
                                    <MoreHorizontal className="h-4 w-4 ml-auto opacity-20" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="group border-b border-border/30 hover:bg-muted/40 transition-all duration-200">
                                    <TableCell className="py-4 pl-2">
                                        <div className="flex flex-col space-y-0.5">
                                            <span className="text-sm font-medium text-foreground">{user.name}</span>
                                            <span className="text-xs text-muted-foreground/70">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 hidden md:table-cell">
                                        <div className="flex items-center">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full mr-2",
                                                user.role === 'admin' ? "bg-primary" : "bg-muted-foreground/30"
                                            )} />
                                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                {user.role === 'admin' ? 'Administrador' : 'Practicante'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 hidden lg:table-cell text-center">
                                        <span className="text-xs text-muted-foreground/60 tabular-nums">
                                            {new Date(user.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-4 text-right pr-2">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-8 w-8 rounded-md hover:bg-background border-0"
                                                onClick={() => openEditModal(user)}
                                            >
                                                <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-destructive/10 hover:text-destructive border-0">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="max-w-[340px] border-none bg-background shadow-2xl rounded-2xl p-6">
                                                    <AlertDialogHeader className="space-y-3">
                                                        <AlertDialogTitle className="text-lg font-semibold text-center">
                                                            Retirar acceso
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-sm text-muted-foreground text-center leading-relaxed">
                                                            El usuario <strong>{user.name}</strong> perderá todos los permisos del sistema.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
                                                        <AlertDialogCancel className="w-full sm:flex-1 border-none bg-muted/50 hover:bg-muted text-xs font-medium rounded-lg h-9">
                                                            Mantener
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction 
                                                            onClick={() => handleDelete(user.id)}
                                                            className="w-full sm:flex-1 bg-destructive text-white hover:bg-destructive/90 text-xs font-medium rounded-lg h-9 shadow-sm"
                                                        >
                                                            Confirmar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modales Estilo Refinado */}
            <Dialog open={isCreateOpen} onOpenChange={(open) => {
                setIsCreateOpen(open);
                if (!open) createForm.reset();
            }}>
                <DialogContent className="sm:max-w-[400px] border-none bg-background shadow-2xl rounded-2xl p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl font-semibold tracking-tight">Nuevo integrante</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">Registre las credenciales de acceso.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Nombre completo</Label>
                                <Input value={createForm.data.name} onChange={e => createForm.setData('name', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Correo institucional</Label>
                                <Input type="email" value={createForm.data.email} onChange={e => createForm.setData('email', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Rol</Label>
                                    <Select value={createForm.data.role} onValueChange={v => createForm.setData('role', v as any)}>
                                        <SelectTrigger className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm"><SelectValue /></SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/50"><SelectItem value="practitioner">Practicante</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Contraseña</Label>
                                    <Input type="password" value={createForm.data.password} onChange={e => createForm.setData('password', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Confirmar contraseña</Label>
                                    <Input type="password" value={createForm.data.password_confirmation} onChange={e => createForm.setData('password_confirmation', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 h-10 rounded-lg font-medium mt-4 transition-all" disabled={createForm.processing}>
                            Crear cuenta
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={(open) => {
                setIsEditOpen(open);
                if (!open) editForm.reset();
            }}>
                <DialogContent className="sm:max-w-[400px] border-none bg-background shadow-2xl rounded-2xl p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl font-semibold tracking-tight">Editar perfil</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">Modifique los datos del personal.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-muted-foreground ml-1">Nombre</Label>
                                <Input value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Email</Label>
                                    <Input type="email" value={editForm.data.email} onChange={e => editForm.setData('email', e.target.value)} className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-muted-foreground ml-1">Rol</Label>
                                    <Select value={editForm.data.role} onValueChange={v => editForm.setData('role', v as any)}>
                                        <SelectTrigger className="bg-muted/40 border-border/50 h-10 rounded-lg px-4 text-sm"><SelectValue /></SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/50"><SelectItem value="practitioner">Practicante</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-muted-foreground/60 mb-2 px-1">Seguridad: solo completar para cambiar clave.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Input type="password" placeholder="Nueva clave" value={editForm.data.password} onChange={e => editForm.setData('password', e.target.value)} className="bg-muted/40 border-border/50 h-9 rounded-lg px-4 text-xs" />
                                    <Input type="password" placeholder="Confirmar" value={editForm.data.password_confirmation} onChange={e => editForm.setData('password_confirmation', e.target.value)} className="bg-muted/40 border-border/50 h-9 rounded-lg px-4 text-xs" />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 h-10 rounded-lg font-medium mt-4 transition-all" disabled={editForm.processing}>
                            Guardar cambios
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
