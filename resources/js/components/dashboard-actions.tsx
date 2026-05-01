import { 
  FileSpreadsheet, 
  FileText, 
  CalendarPlus, 
  Users, 
  BookOpen, 
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export function DashboardActions() {
  const handleExport = (type: string, format: string) => {
    const typeSlug = type.toLowerCase() === "usuarios" ? "users" : "workshops";
    const formatSlug = format.toLowerCase();
    const baseUrl = `/export/${formatSlug}/${typeSlug}`;
    
    window.location.href = baseUrl;

    toast.success(`Generando reporte de ${type.toLowerCase()} en formato ${format.toUpperCase()}...`, {
      description: "El documento se descargará automáticamente.",
    });
  };

  return (
    <div className="px-4">
      <Card className="p-6 border-none shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-neutral-950 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 overflow-hidden">
        {/* Bloque de Texto */}
        <div className="flex flex-col gap-1 w-full xl:w-auto">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
            Acciones y Reportes
          </h3>
          <p className="text-xs text-neutral-500 font-medium leading-relaxed">
            Exporta datos del sistema o genera nuevos registros académicos.
          </p>
        </div>
        
        {/* Bloque de Botones - Más flexible para evitar desbordamientos */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Dropdown EXCEL */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 sm:flex-none min-w-[120px] h-10 rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-bold text-[11px] uppercase tracking-wider"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" />
                Excel
                <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-2xl ring-1 ring-neutral-200">
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-2 py-2">
                Exportar a Excel
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="rounded-lg gap-2 cursor-pointer py-2.5"
                onClick={() => handleExport("Usuarios", "Excel")}
              >
                <Users className="size-4 text-neutral-500" />
                <span className="font-medium text-sm">Todos los Usuarios</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg gap-2 cursor-pointer py-2.5"
                onClick={() => handleExport("Talleres", "Excel")}
              >
                <BookOpen className="size-4 text-neutral-500" />
                <span className="font-medium text-sm">Todos los Talleres</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Dropdown PDF */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 sm:flex-none min-w-[120px] h-10 rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-bold text-[11px] uppercase tracking-wider"
              >
                <FileText className="mr-2 h-4 w-4 text-red-600" />
                PDF
                <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-2xl ring-1 ring-neutral-200">
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-2 py-2">
                Exportar a PDF
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="rounded-lg gap-2 cursor-pointer py-2.5"
                onClick={() => handleExport("Usuarios", "PDF")}
              >
                <Users className="size-4 text-neutral-500" />
                <span className="font-medium text-sm">Todos los Usuarios</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg gap-2 cursor-pointer py-2.5"
                onClick={() => handleExport("Talleres", "PDF")}
              >
                <BookOpen className="size-4 text-neutral-500" />
                <span className="font-medium text-sm">Todos los Talleres</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" asChild className="flex-1 sm:flex-none min-w-[160px] h-10 rounded-lg bg-[rgb(220,38,38)] hover:bg-red-700 font-bold text-[11px] uppercase tracking-wider shadow-md active:scale-95 transition-all">
            <Link href="/workshops">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nuevo Registro
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
