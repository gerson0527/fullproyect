
import { useState } from "react"
import { Download, FileText, TrendingUp, BarChart3, PieChart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-picker-range/date-picker-range"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const reportesData = {
  creditosPorMes: [
    { mes: "Enero", aprobados: 45, rechazados: 12, pendientes: 8 },
    { mes: "Febrero", aprobados: 52, rechazados: 15, pendientes: 6 },
    { mes: "Marzo", aprobados: 48, rechazados: 10, pendientes: 12 },
    { mes: "Abril", aprobados: 61, rechazados: 18, pendientes: 9 },
    { mes: "Mayo", aprobados: 58, rechazados: 14, pendientes: 7 },
    { mes: "Junio", aprobados: 67, rechazados: 16, pendientes: 11 },
  ],
  topAsesores: [
    { nombre: "Ana Rodríguez", creditos: 23, monto: 1200000, comision: 24000 },
    { nombre: "Carlos Mendoza", creditos: 21, monto: 1100000, comision: 22000 },
    { nombre: "Roberto Silva", creditos: 18, monto: 890000, comision: 17800 },
    { nombre: "Laura Martínez", creditos: 15, monto: 650000, comision: 13000 },
    { nombre: "Patricia Gómez", creditos: 16, monto: 780000, comision: 15600 },
  ],
  bancosPorVolumen: [
    { banco: "Banco Nacional", creditos: 456, monto: 18500000, participacion: 35 },
    { banco: "Banco Popular", creditos: 342, monto: 14200000, participacion: 27 },
    { banco: "Banco Internacional", creditos: 567, monto: 22700000, participacion: 43 },
    { banco: "Banco Regional", creditos: 234, monto: 8900000, participacion: 17 },
  ],
  morosidad: [
    { rango: "0-30 días", cantidad: 12, monto: 450000, porcentaje: 2.1 },
    { rango: "31-60 días", cantidad: 8, monto: 320000, porcentaje: 1.5 },
    { rango: "61-90 días", cantidad: 5, monto: 180000, porcentaje: 0.8 },
    { rango: "90+ días", cantidad: 3, monto: 95000, porcentaje: 0.4 },
  ],
}

export function ReportesContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes")
  const [selectedReport, setSelectedReport] = useState("general")

  const handleExportReport = (format: string) => {
    console.log(`Exportando reporte en formato: ${format}`)
    // Implementar lógica de exportación
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("excel")}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros de Reporte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mes</SelectItem>
                  <SelectItem value="trimestre">Este trimestre</SelectItem>
                  <SelectItem value="año">Este año</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Tipo de Reporte</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="asesores">Por Asesores</SelectItem>
                  <SelectItem value="bancos">Por Bancos</SelectItem>
                  <SelectItem value="morosidad">Morosidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Rango de Fechas</label>
              <DatePickerWithRange />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Reportes */}
      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen Ejecutivo</TabsTrigger>
          <TabsTrigger value="creditos">Análisis de Créditos</TabsTrigger>
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="morosidad">Morosidad</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4">
          {/* KPIs del Período */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Créditos</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">331</div>
                <p className="text-xs text-muted-foreground">+12.5% vs período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monto Desembolsado</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.8M</div>
                <p className="text-xs text-muted-foreground">+8.2% vs período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Aprobación</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82.4%</div>
                <p className="text-xs text-muted-foreground">+3.1% vs período anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comisiones</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$256K</div>
                <p className="text-xs text-muted-foreground">+15.3% vs período anterior</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Tendencias */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Créditos por Mes</CardTitle>
              <CardDescription>Evolución de aprobaciones, rechazos y pendientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportesData.creditosPorMes.map((mes, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium">{mes.mes}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Aprobados: {mes.aprobados}</span>
                        <span>Rechazados: {mes.rechazados}</span>
                        <span>Pendientes: {mes.pendientes}</span>
                      </div>
                      <div className="flex space-x-1">
                        <div
                          className="bg-green-500 h-2 rounded"
                          style={{
                            width: `${(mes.aprobados / (mes.aprobados + mes.rechazados + mes.pendientes)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="bg-red-500 h-2 rounded"
                          style={{
                            width: `${(mes.rechazados / (mes.aprobados + mes.rechazados + mes.pendientes)) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="bg-yellow-500 h-2 rounded"
                          style={{
                            width: `${(mes.pendientes / (mes.aprobados + mes.rechazados + mes.pendientes)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creditos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Distribución por Banco */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Banco</CardTitle>
                <CardDescription>Volumen de créditos por institución</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportesData.bancosPorVolumen.map((banco, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{banco.banco}</span>
                        <span className="text-sm text-muted-foreground">{banco.creditos} créditos</span>
                      </div>
                      <Progress value={banco.participacion} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${(banco.monto / 1000000).toFixed(1)}M</span>
                        <span>{banco.participacion}% del total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estados de Créditos */}
            <Card>
              <CardHeader>
                <CardTitle>Estados de Créditos</CardTitle>
                <CardDescription>Distribución actual de estados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Aprobados</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">1,234</div>
                      <div className="text-xs text-muted-foreground">78.5%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">En Proceso</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">156</div>
                      <div className="text-xs text-muted-foreground">9.9%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Rechazados</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">182</div>
                      <div className="text-xs text-muted-foreground">11.6%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rendimiento" className="space-y-4">
          {/* Top Asesores */}
          <Card>
            <CardHeader>
              <CardTitle>Ranking de Asesores</CardTitle>
              <CardDescription>Rendimiento por asesor en el período seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posición</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Créditos</TableHead>
                    <TableHead>Monto Gestionado</TableHead>
                    <TableHead>Comisiones</TableHead>
                    <TableHead>Rendimiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportesData.topAsesores.map((asesor, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant={index < 3 ? "default" : "secondary"}>#{index + 1}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{asesor.nombre}</TableCell>
                      <TableCell>{asesor.creditos}</TableCell>
                      <TableCell>${(asesor.monto / 1000).toFixed(0)}K</TableCell>
                      <TableCell>${(asesor.comision / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={(asesor.creditos / 25) * 100} className="w-16" />
                          <span className="text-xs">{Math.round((asesor.creditos / 25) * 100)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="morosidad" className="space-y-4">
          {/* Análisis de Morosidad */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Morosidad</CardTitle>
                <CardDescription>Distribución por rangos de días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportesData.morosidad.map((rango, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{rango.rango}</span>
                        <span className="text-sm text-muted-foreground">{rango.cantidad} casos</span>
                      </div>
                      <Progress value={rango.porcentaje * 10} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${(rango.monto / 1000).toFixed(0)}K</span>
                        <span>{rango.porcentaje}% del total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Riesgo</CardTitle>
                <CardDescription>Métricas clave de morosidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasa de Morosidad Total</span>
                    <div className="text-right">
                      <div className="font-medium text-lg">4.8%</div>
                      <div className="text-xs text-green-600">-0.3% vs mes anterior</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monto en Riesgo</span>
                    <div className="text-right">
                      <div className="font-medium text-lg">$1.045M</div>
                      <div className="text-xs text-red-600">+2.1% vs mes anterior</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Casos Críticos (90+ días)</span>
                    <div className="text-right">
                      <div className="font-medium text-lg">3</div>
                      <div className="text-xs text-green-600">-2 vs mes anterior</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasa de Recuperación</span>
                    <div className="text-right">
                      <div className="font-medium text-lg">87.2%</div>
                      <div className="text-xs text-green-600">+1.5% vs mes anterior</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
