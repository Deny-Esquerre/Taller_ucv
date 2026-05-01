"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  total: {
    label: "Talleres",
    color: "#DC2626", // Rojo UCV
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ data = [] }: { data: any[] }) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = React.useMemo(() => {
    if (!data?.length) return [];
    
    const now = new Date();
    const processed = data.map(d => ({
        date: d.date,
        total: Number(d.programados || 0) + Number(d.terminados || 0)
    }));

    const filtered = processed.filter((item) => {
      const itemDate = new Date(item.date + "T00:00:00");
      let daysToSubtract = 90;
      if (timeRange === "30d") daysToSubtract = 30;
      if (timeRange === "7d") daysToSubtract = 7;
      
      const startDate = new Date();
      startDate.setDate(now.getDate() - daysToSubtract);
      startDate.setHours(0, 0, 0, 0);
      return itemDate >= startDate;
    });

    return filtered.length > 0 ? filtered : processed.slice(-30);
  }, [data, timeRange]);

  return (
    <Card className="pt-0 border-none shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 border-b py-5 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl font-bold">Estadísticas de Talleres</CardTitle>
          <CardDescription>
            Volumen total de talleres registrados en el sistema.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-full rounded-lg sm:ml-auto sm:w-[160px]"
            aria-label="Seleccionar periodo"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 días
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Última semana
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[300px] w-full">
            <ChartContainer
            config={chartConfig}
            className="h-full w-full"
            >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                    data={filteredData}
                    margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                >
                    <defs>
                    <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="5%"
                        stopColor="var(--color-total)"
                        stopOpacity={0.4}
                        />
                        <stop
                        offset="95%"
                        stopColor="var(--color-total)"
                        stopOpacity={0.01}
                        />
                    </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    minTickGap={60}
                    tickFormatter={(value) => {
                        try {
                            const date = new Date(value + "T00:00:00");
                            return date.toLocaleDateString("es-ES", {
                                month: "short",
                                day: "numeric",
                            });
                        } catch (e) {
                            return value;
                        }
                    }}
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    />
                    <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    style={{ fontSize: '11px', opacity: 0.5 }}
                    />
                    <ChartTooltip
                    cursor={{ stroke: '#DC2626', strokeWidth: 1, strokeDasharray: '4 4' }}
                    content={
                        <ChartTooltipContent
                            labelFormatter={(value) => {
                                const date = new Date(value + "T00:00:00");
                                return date.toLocaleDateString("es-ES", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                });
                            }}
                            indicator="dot"
                        />
                    }
                    />
                    <Area
                    dataKey="total"
                    type="monotone"
                    fill="url(#fillTotal)"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    isAnimationActive={false}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
            </ResponsiveContainer>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}