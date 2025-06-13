"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TableFilter } from "@/components/table-filter/table-filter"
import { TableActions } from "@/components/table-actions/table-actions"
import { TablePagination } from "@/components/table-pagination/table-pagination"
import { ActionModals } from "@/components/action-modals/action-modals"
import { AddModal } from "@/components/add-modals/add-modals"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@/components/notifications-panel/notifications-panel"

const initialCreditosData = [
    {
      id: "CR-001",
      cliente: "Juan Pérez",
      monto: 50000,
      banco: "Banco Nacional",
      asesor: "Ana Rodríguez",
      fechaSolicitud: "2024-01-15",
      fechaAprobacion: "2024-01-20",
      fechaVencimiento: "2024-07-20",
      estado: "Aprobado",
      estadoVariant: "default" as const,
      tasa: "12.5%",
      plazo: 6,
      tipo: "Personal",
      garantia: "Nómina",
    },
    {
      id: "CR-002",
      cliente: "María García",
      monto: 25000,
      banco: "Banco Popular",
      asesor: "Carlos Mendoza",
      fechaSolicitud: "2024-01-18",
      fechaAprobacion: null,
      fechaVencimiento: null,
      estado: "En Revisión",
      estadoVariant: "secondary" as const,
      tasa: "13.2%",
      plazo: 12,
      tipo: "Personal",
      garantia: "Aval",
    },
    {
      id: "CR-003",
      cliente: "Carlos López",
      monto: 75000,
      banco: "Financiera ABC",
      asesor: "Roberto Silva",
      fechaSolicitud: "2024-01-10",
      fechaAprobacion: null,
      fechaVencimiento: null,
      estado: "Rechazado",
      estadoVariant: "destructive" as const,
      tasa: "15.8%",
      plazo: 24,
      tipo: "Vehicular",
      garantia: "Vehículo",
    },
    {
      id: "CR-004",
      cliente: "Ana Rodríguez",
      monto: 120000,
      banco: "Banco Internacional",
      asesor: "Laura Martínez",
      fechaSolicitud: "2024-01-22",
      fechaAprobacion: "2024-01-25",
      fechaVencimiento: "2024-12-25",
      estado: "Desembolsado",
      estadoVariant: "default" as const,
      tasa: "11.8%",
      plazo: 12,
      tipo: "Empresarial",
      garantia: "Hipotecaria",
    },
    {
      id: "CR-005",
      cliente: "Roberto Gómez",
      monto: 35000,
      banco: "Banco Regional",
      asesor: "Patricia Gómez",
      fechaSolicitud: "2024-02-01",
      fechaAprobacion: null,
      fechaVencimiento: null,
      estado: "Pendiente",
      estadoVariant: "secondary" as const,
      tasa: "14.1%",
      plazo: 18,
      tipo: "Personal",
      garantia: "Nómina",
    },
    {
      id: "CR-006",
      cliente: "Laura Martínez",
      monto: 200000,
      banco: "Hogar Financiera",
      asesor: "Ana Rodríguez",
      fechaSolicitud: "2024-01-28",
      fechaAprobacion: "2024-02-02",
      fechaVencimiento: "2029-02-02",
      estado: "Activo",
      estadoVariant: "default" as const,
      tasa: "11.5%",
      plazo: 60,
      tipo: "Hipotecario",
      garantia: "Inmueble",
    },
    {
      id: "CR-007",
      cliente: "Pedro Sánchez",
      monto: 15000,
      banco: "MicroFinanzas Plus",
      asesor: "Carlos Mendoza",
      fechaSolicitud: "2024-02-05",
      fechaAprobacion: null,
      fechaVencimiento: null,
      estado: "Documentos Pendientes",
      estadoVariant: "secondary" as const,
      tasa: "22.1%",
      plazo: 6,
      tipo: "Microcrédito",
      garantia: "Aval",
    },
    {
      id: "CR-008",
      cliente: "Carmen Ruiz",
      monto: 80000,
      banco: "Financiera Rápida",
      asesor: "Roberto Silva",
      fechaSolicitud: "2024-01-30",
      fechaAprobacion: "2024-02-03",
      fechaVencimiento: "2026-02-03",
      estado: "Activo",
      estadoVariant: "default" as const,
      tasa: "14.2%",
      plazo: 24,
      tipo: "Vehicular",
      garantia: "Vehículo",
    },
  ]
  
  const filterOptions = [
    {
      key: "estado",
      label: "Estado",
      options: [
        { label: "Pendiente", value: "Pendiente" },
        { label: "En Revisión", value: "En Revisión" },
        { label: "Aprobado", value: "Aprobado" },
        { label: "Desembolsado", value: "Desembolsado" },
        { label: "Activo", value: "Activo" },
        { label: "Rechazado", value: "Rechazado" },
        { label: "Documentos Pendientes", value: "Documentos Pendientes" },
      ],
    },
    {
      key: "tipo",
      label: "Tipo de Crédito",
      options: [
        { label: "Personal", value: "Personal" },
        { label: "Vehicular", value: "Vehicular" },
        { label: "Hipotecario", value: "Hipotecario" },
        { label: "Empresarial", value: "Empresarial" },
        { label: "Microcrédito", value: "Microcrédito" },
      ],
    },
    {
      key: "banco",
      label: "Banco/Financiera",
      options: [
        { label: "Banco Nacional", value: "Banco Nacional" },
        { label: "Banco Popular", value: "Banco Popular" },
        { label: "Banco Internacional", value: "Banco Internacional" },
        { label: "Banco Regional", value: "Banco Regional" },
        { label: "Financiera ABC", value: "Financiera ABC" },
        { label: "Hogar Financiera", value: "Hogar Financiera" },
        { label: "MicroFinanzas Plus", value: "MicroFinanzas Plus" },
        { label: "Financiera Rápida", value: "Financiera Rápida" },
      ],
    },
    {
      key: "asesor",
      label: "Asesor",
      options: [
        { label: "Ana Rodríguez", value: "Ana Rodríguez" },
        { label: "Carlos Mendoza", value: "Carlos Mendoza" },
        { label: "Roberto Silva", value: "Roberto Silva" },
        { label: "Laura Martínez", value: "Laura Martínez" },
        { label: "Patricia Gómez", value: "Patricia Gómez" },
      ],
    },
    {
      key: "rangoMonto",
      label: "Rango de Monto",
      options: [
        { label: "Hasta $25K", value: "bajo" },
        { label: "$25K - $75K", value: "medio" },
        { label: "$75K - $150K", value: "alto" },
        { label: "Más de $150K", value: "premium" },
      ],
    },
  ]
  
  interface CreditosContentProps {
    onAddNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  }
  
  export function CreditosContent({ onAddNotification }: CreditosContentProps) {
    const [creditosData, setCreditosData] = useState(initialCreditosData)
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [modalState, setModalState] = useState<{
      isOpen: boolean
      action: "view" | "edit" | "delete" | null
      data: any
    }>({
      isOpen: false,
      action: null,
      data: null,
    })
    const [addModalOpen, setAddModalOpen] = useState(false)
  
    const { toast } = useToast()
  
    // Generar estadoVariant basado en el estado
    const getEstadoVariant = (estado: string) => {
      switch (estado) {
        case "Aprobado":
        case "Desembolsado":
        case "Activo":
          return "default" as const
        case "Rechazado":
          return "destructive" as const
        default:
          return "secondary" as const
      }
    }
  
    // Filtrar datos
    const filteredData = creditosData.filter((credito) => {
      // Filtro de búsqueda
      if (
        filters.search &&
        !credito.cliente.toLowerCase().includes(filters.search.toLowerCase()) &&
        !credito.id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !credito.banco.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
  
      // Filtro de estado
      if (filters.estado && credito.estado !== filters.estado) {
        return false
      }
  
      // Filtro de tipo
      if (filters.tipo && credito.tipo !== filters.tipo) {
        return false
      }
  
      // Filtro de banco
      if (filters.banco && credito.banco !== filters.banco) {
        return false
      }
  
      // Filtro de asesor
      if (filters.asesor && credito.asesor !== filters.asesor) {
        return false
      }
  
      // Filtro de rango de monto
      if (filters.rangoMonto) {
        const monto = credito.monto
        if (filters.rangoMonto === "bajo" && monto > 25000) return false
        if (filters.rangoMonto === "medio" && (monto <= 25000 || monto > 75000)) return false
        if (filters.rangoMonto === "alto" && (monto <= 75000 || monto > 150000)) return false
        if (filters.rangoMonto === "premium" && monto <= 150000) return false
      }
  
      return true
    })
  
    // Paginación
    const totalItems = filteredData.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  
    // Formatear monto
    const formatearMonto = (monto: number) => {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 0,
      }).format(monto)
    }
  
    // Generar nuevo ID
    const generateNewId = () => {
      const maxId = Math.max(...creditosData.map((c) => Number.parseInt(c.id.split("-")[1])))
      return `CR-${String(maxId + 1).padStart(3, "0")}`
    }
  
    // Handlers para acciones
    const handleViewCredito = (credito: any) => {
      setModalState({ isOpen: true, action: "view", data: credito })
    }
  
    const handleEditCredito = (credito: any) => {
      setModalState({ isOpen: true, action: "edit", data: credito })
    }
  
    const handleDeleteCredito = (credito: any) => {
      setModalState({ isOpen: true, action: "delete", data: credito })
    }
  
    const handleSaveCredito = (data: any) => {
      setCreditosData((prev) =>
        prev.map((credito) =>
          credito.id === data.id ? { ...data, estadoVariant: getEstadoVariant(data.estado) } : credito,
        ),
      )
  
      toast({
        title: "Crédito actualizado",
        description: `El crédito ${data.id} ha sido actualizado correctamente.`,
        variant: "success",
      })
  
      onAddNotification({
        type: "success",
        title: "Crédito actualizado",
        description: `Se actualizó el crédito ${data.id} de ${data.cliente}`,
        read: false,
      })
    }
  
    const handleDeleteConfirm = () => {
      const creditoId = modalState.data?.id
      const cliente = modalState.data?.cliente
  
      setCreditosData((prev) => prev.filter((credito) => credito.id !== creditoId))
  
      toast({
        title: "Crédito eliminado",
        description: `El crédito ${creditoId} ha sido eliminado del sistema.`,
        variant: "destructive",
      })
  
      onAddNotification({
        type: "warning",
        title: "Crédito eliminado",
        description: `Se eliminó el crédito ${creditoId} de ${cliente}`,
        read: false,
      })
    }
  
    const handleAddCredito = (data: any) => {
      const newId = generateNewId()
      const newCredito = {
        ...data,
        id: newId,
        monto: Number(data.monto),
        plazo: Number(data.plazo),
        estadoVariant: getEstadoVariant(data.estado || "Pendiente"),
        fechaSolicitud: data.fechaSolicitud || new Date().toISOString().split("T")[0],
      }
  
      setCreditosData((prev) => [newCredito, ...prev])
  
      toast({
        title: "Crédito creado",
        description: `Se ha creado el crédito ${newId} para ${data.cliente}.`,
        variant: "success",
      })
  
      onAddNotification({
        type: "success",
        title: "Nuevo crédito creado",
        description: `Se registró el crédito ${newId} para ${data.cliente}`,
        read: false,
      })
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Gestión de Créditos</h2>
          <Button onClick={() => setAddModalOpen(true)}>Nuevo Crédito</Button>
        </div>
  
        {/* Resumen de Estados */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{creditosData.length}</div>
              <p className="text-xs text-muted-foreground">Registrados en el sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {creditosData.filter((c) => c.estado === "Activo" || c.estado === "Desembolsado").length}
              </div>
              <p className="text-xs text-muted-foreground">Créditos vigentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {
                  creditosData.filter(
                    (c) => c.estado === "Pendiente" || c.estado === "En Revisión" || c.estado === "Documentos Pendientes",
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Pendientes de aprobación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatearMonto(creditosData.reduce((sum, c) => sum + c.monto, 0))}
              </div>
              <p className="text-xs text-muted-foreground">Valor total de cartera</p>
            </CardContent>
          </Card>
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Lista de Créditos</CardTitle>
            <CardDescription>Administra todos los créditos del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TableFilter
              onFilterChange={setFilters}
              filterOptions={filterOptions}
              placeholder="Buscar por ID, cliente o banco..."
            />
  
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Banco/Financiera</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Tasa</TableHead>
                    <TableHead className="w-[80px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((credito) => (
                      <TableRow key={credito.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{credito.id}</TableCell>
                        <TableCell>{credito.cliente}</TableCell>
                        <TableCell>{formatearMonto(credito.monto)}</TableCell>
                        <TableCell>{credito.banco}</TableCell>
                        <TableCell>{credito.asesor}</TableCell>
                        <TableCell>{credito.tipo}</TableCell>
                        <TableCell>
                          <Badge variant={credito.estadoVariant}>{credito.estado}</Badge>
                        </TableCell>
                        <TableCell>{credito.tasa}</TableCell>
                        <TableCell>
                          <TableActions
                            row={credito}
                            onView={handleViewCredito}
                            onEdit={handleEditCredito}
                            onDelete={handleDeleteCredito}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No se encontraron resultados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
  
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setCurrentPage(1)
              }}
            />
          </CardContent>
        </Card>
  
        <ActionModals
          type="credito"
          action={modalState.action}
          data={modalState.data}
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, action: null, data: null })}
          onSave={handleSaveCredito}
          onDelete={handleDeleteConfirm}
        />
  
        <AddModal type="credito" isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddCredito} />
      </div>
    )
  }
