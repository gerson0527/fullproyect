import { CreditCard, DollarSign, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiCard } from "@/components/kpi-card/kpi-card"
import { ProgressItem } from "@/components/progress-item/progress-item"
import { ActivityItem } from "@/components/activity-item/activity-item"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Créditos Activos" value="1,234" change="+12% desde el mes pasado" icon={CreditCard} />
        <KpiCard title="Monto Total" value="$45.2M" change="+8% desde el mes pasado" icon={DollarSign} />
        <KpiCard title="Tasa de Aprobación" value="78.5%" change="+2.1% desde el mes pasado" icon={TrendingUp} />
        <KpiCard title="Clientes Nuevos" value="89" change="+15% desde el mes pasado" icon={Users} />
      </div>

      {/* Objetivos del Mes */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos del Mes</CardTitle>
          <CardDescription>Progreso hacia las metas establecidas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProgressItem label="Créditos Aprobados" current={156} target={200} />
          <ProgressItem label="Monto Desembolsado" current={3.2} target={4} unit="$" />
          <ProgressItem label="Nuevos Clientes" current={89} target={120} />
        </CardContent>
      </Card>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              type="success"
              title="Crédito aprobado - Juan Pérez"
              description="$50,000 - Banco Nacional"
              time="Hace 5 min"
            />
            <ActivityItem
              type="info"
              title="Nueva solicitud - María García"
              description="$25,000 - En revisión"
              time="Hace 12 min"
            />
            <ActivityItem
              type="warning"
              title="Documentos pendientes - Carlos López"
              description="$75,000 - Financiera ABC"
              time="Hace 1 hora"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
