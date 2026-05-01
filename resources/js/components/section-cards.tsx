import { TrendingUp, Users, CalendarCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-slate-200/40 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-sm">
      {/* Talleres Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Talleres Programados</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100">
            {stats?.workshops?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-400">
              <TrendingUp className="size-3" />
              +{stats?.workshops?.growth || 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
            Crecimiento este mes <TrendingUp className="size-4 text-emerald-600" />
          </div>
          <div className="text-muted-foreground text-xs font-medium">
            Total de talleres registrados
          </div>
        </CardFooter>
      </Card>
      
      {/* Usuarios Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Usuarios Totales</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100">
            {stats?.users?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400">
              <Users className="size-3" />
              +{stats?.users?.growth || 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
            Nuevos este mes <TrendingUp className="size-4 text-blue-600" />
          </div>
          <div className="text-muted-foreground text-xs font-medium">
            Usuarios registrados en el sistema
          </div>
        </CardFooter>
      </Card>
      
      {/* Dias Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Días Habilitados</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100">
            {stats?.enabled_days?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
              <CalendarCheck className="size-3" />
              Sincronizado
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
            Disponibilidad especial <TrendingUp className="size-4 text-amber-500" />
          </div>
          <div className="text-muted-foreground text-xs font-medium">Días fuera del horario estándar</div>
        </CardFooter>
      </Card>
    </div>
  )
}
