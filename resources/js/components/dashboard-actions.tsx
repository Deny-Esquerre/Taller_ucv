import { FileSpreadsheet, FileText, CalendarPlus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

export function DashboardActions() {
  return (
    <div className="px-4 lg:px-6">
      <Card className="p-4 border border-border/40 shadow-xs bg-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-sm font-semibold text-foreground leading-none mb-1.5">Acciones y Reportes</h3>
          <p className="text-xs text-muted-foreground">Genera documentos o accede a la configuración avanzada</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 md:flex-none bg-background/50 border-green-600/20 text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/10 dark:border-green-900/30"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 md:flex-none bg-background/50 border-red-600/20 text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 dark:border-red-900/30"
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          
          <Button size="sm" asChild className="flex-1 md:flex-none shadow-sm">
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
