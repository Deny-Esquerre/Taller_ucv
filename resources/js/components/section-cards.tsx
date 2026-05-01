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
import { Area, AreaChart, ResponsiveContainer } from "recharts"

export function SectionCards({ stats }: { stats: any }) {
  // Aseguramos que siempre haya datos para mostrar algo en el gráfico aunque sea una línea base
  const workshopsData = stats?.workshops?.sparkline?.length > 0 ? stats.workshops.sparkline : [{val:0}, {val:0}];
  const usersData = stats?.users?.sparkline?.length > 0 ? stats.users.sparkline : [{val:0}, {val:0}];
  const daysData = stats?.enabled_days?.sparkline?.length > 0 ? stats.enabled_days.sparkline : [{val:0}, {val:0}];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-slate-200/40 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-sm">
      {/* Talleres Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900 overflow-hidden">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Talleres Programados</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100 mt-2">
            {stats?.workshops?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-400">
              <TrendingUp className="size-3" />
              +{stats?.workshops?.growth || 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-row items-end justify-between gap-2 text-sm pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
                Crecimiento este mes <TrendingUp className="size-4 text-emerald-600" />
            </div>
            <div className="text-muted-foreground text-xs font-medium">
                Total de talleres registrados
            </div>
          </div>
          <div className="h-[40px] w-[90px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workshopsData}>
                    <defs>
                        <linearGradient id="colorTalleres" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#10b981" fillOpacity={1} fill="url(#colorTalleres)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardFooter>
      </Card>
      
      {/* Usuarios Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900 overflow-hidden">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Usuarios Totales</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100 mt-2">
            {stats?.users?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400">
              <Users className="size-3" />
              +{stats?.users?.growth || 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-row items-end justify-between gap-2 text-sm pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
                Nuevos este mes <TrendingUp className="size-4 text-blue-600" />
            </div>
            <div className="text-muted-foreground text-xs font-medium">
                Usuarios registrados en el sistema
            </div>
          </div>
          <div className="h-[40px] w-[90px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usersData}>
                    <defs>
                        <linearGradient id="colorUsuarios" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsuarios)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardFooter>
      </Card>
      
      {/* Dias Card */}
      <Card className="@container/card border-none ring-1 ring-neutral-200 dark:ring-neutral-800 dark:*:data-[slot=card]:from-neutral-900 overflow-hidden">
        <CardHeader>
          <CardDescription className="font-medium text-foreground/70">Días Habilitados</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl text-neutral-900 dark:text-neutral-100 mt-2">
            {stats?.enabled_days?.total || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400">
              <CalendarCheck className="size-3" />
              Sincronizado
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-row items-end justify-between gap-2 text-sm pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="line-clamp-1 flex gap-2 font-semibold text-foreground">
                Disponibilidad especial <TrendingUp className="size-4 text-amber-500" />
            </div>
            <div className="text-muted-foreground text-xs font-medium">Días fuera del horario estándar</div>
          </div>
          <div className="h-[40px] w-[90px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={daysData}>
                    <defs>
                        <linearGradient id="colorDias" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#f59e0b" fillOpacity={1} fill="url(#colorDias)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
