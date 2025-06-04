"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TableFilter } from "@/components/table-filter/table-filter"
import { TableActions } from "@/components/table-actions/table-actions"
import { TablePagination } from "@/components/table-pagination/table-pagination"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@/components/notifications-panel/notifications-panel"
import { AddModal } from "@/components/add-modals/add-modals"
import { ActionModals } from "@/components/action-modals/action-modals"

const initialBancosData = [
  {
    id: "1",
    nombre: "Banco Nacional",
    tipo: "Comercial",
    creditosActivos: 456,
    montoTotal: "$18.5M",
    tasaPromedio: "12.5%",
    estado: "Activo",
    estadoVariant: "default" as const,
    contacto: "María González",
    telefono: "+1 234 567 8900",
    email: "contacto@banconacional.com",
  },
  {
    id: "2",
    nombre: "Banco Popular",
    tipo: "Comercial",
    creditosActivos: 342,
    montoTotal: "$14.2M",
    tasaPromedio: "13.2%",
    estado: "Activo",
    estadoVariant: "default" as const,
    contacto: "Carlos López",
    telefono: "+1 234 567 8901",
    email: "contacto@bancopopular.com",
  },
  {
    id: "3",
    nombre: "Banco Regional",
    tipo: "Regional",
    creditosActivos: 234,
    montoTotal: "$8.9M",
    tasaPromedio: "14.1%",
    estado: "Revisión",
    estadoVariant: "secondary" as const,
    contacto: "Ana Rodríguez",
    telefono: "+1 234 567 8902",
    email: "contacto@bancoregional.com",
  },
  {
    id: "4",
    nombre: "Banco Internacional",
    tipo: "Internacional",
    creditosActivos: 567,
    montoTotal: "$22.7M",
    tasaPromedio: "11.8%",
    estado: "Activo",
    estadoVariant: "default" as const,
    contacto: "Roberto Silva",
    telefono: "+1 234 567 8903",
    email: "contacto@bancointernacional.com",
  },
  {
    id: "5",
    nombre: "Banco Cooperativo",
    tipo: "Cooperativo",
    creditosActivos: 189,
    montoTotal: "$5.3M",
    tasaPromedio: "10.5%",
    estado: "Activo",
    estadoVariant: "default" as const,
    contacto: "Laura Martínez",
    telefono: "+1 234 567 8904",
    email: "contacto@bancocooperativo.com",
  },
  {
    id: "6",
    nombre: "Banco Agrícola",
    tipo: "Especializado",
    creditosActivos: 123,
    montoTotal: "$4.8M",
    tasaPromedio: "9.7%",
    estado: "Inactivo",
    estadoVariant: "destructive" as const,
    contacto: "Pedro Sánchez",
    telefono: "+1 234 567 8905",
    email: "contacto@bancoagricola.com",
  },
]

const filterOptions = [
  {
    key: "tipo",
    label: "Tipo",
    options: [
      { label: "Comercial", value: "Comercial" },
      { label: "Regional", value: "Regional" },
      { label: "Internacional", value: "Internacional" },
      { label: "Cooperativo", value: "Cooperativo" },
      { label: "Especializado", value: "Especializado" },
    ],
  },
  {
    key: "estado",
    label: "Estado",
    options: [
      { label: "Activo", value: "Activo" },
      { label: "Revisión", value: "Revisión" },
      { label: "Inactivo", value: "Inactivo" },
    ],
  },
]

interface BancosContentProps {
  onAddNotification?: (notification: Omit<Notification, "id" | "timestamp">) => void
}

export function BancosContent({ onAddNotification }: BancosContentProps) {
  const [bancosData, setBancosData] = useState(initialBancosData)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
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
      case "Activo":
        return "default" as const
      case "Inactivo":
        return "destructive" as const
      default:
        return "secondary" as const
    }
  }

  // Filtrar datos
  const filteredData = bancosData.filter((banco) => {
    // Filtro de búsqueda
    if (filters.search && !banco.nombre.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Filtro de tipo
    if (filters.tipo && banco.tipo !== filters.tipo) {
      return false
    }

    // Filtro de estado
    if (filters.estado && banco.estado !== filters.estado) {
      return false
    }

    return true
  })

  // Paginación
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Generar nuevo ID
  const generateNewId = () => {
    const maxId = Math.max(...bancosData.map((b) => Number.parseInt(b.id)))
    return (maxId + 1).toString()
  }

  // Handlers para acciones
  const handleViewBanco = (banco: any) => {
    setModalState({ isOpen: true, action: "view", data: banco })
  }

  const handleEditBanco = (banco: any) => {
    setModalState({ isOpen: true, action: "edit", data: banco })
  }

  const handleDeleteBanco = (banco: any) => {
    setModalState({ isOpen: true, action: "delete", data: banco })
  }

  const handleSaveBanco = (data: any) => {
    setBancosData((prev) =>
      prev.map((banco) => (banco.id === data.id ? { ...data, estadoVariant: getEstadoVariant(data.estado) } : banco)),
    )

    toast({
      title: "Banco actualizado",
      description: `Los datos de ${data.nombre} han sido actualizados correctamente.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "success",
        title: "Banco actualizado",
        description: `Se actualizó la información de ${data.nombre}`,
        read: false,
      })
    }
  }

  const handleDeleteConfirm = () => {
    const bancoName = modalState.data?.nombre
    const bancoId = modalState.data?.id

    setBancosData((prev) => prev.filter((banco) => banco.id !== bancoId))

    toast({
      title: "Banco eliminado",
      description: `${bancoName} ha sido eliminado del sistema.`,
      variant: "destructive",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "warning",
        title: "Banco eliminado",
        description: `Se eliminó a ${bancoName} del sistema`,
        read: false,
      })
    }
  }

  const handleAddBanco = (data: any) => {
    const newId = generateNewId()
    const newBanco = {
      ...data,
      id: newId,
      creditosActivos: 0,
      montoTotal: "$0M",
      estadoVariant: getEstadoVariant(data.estado || "Activo"),
    }

    setBancosData((prev) => [newBanco, ...prev])

    toast({
      title: "Banco agregado",
      description: `${data.nombre} ha sido agregado como aliado comercial.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "success",
        title: "Nuevo banco agregado",
        description: `Se registró a ${data.nombre} como aliado comercial`,
        read: false,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bancos Aliados</h2>
        <Button onClick={() => setAddModalOpen(true)}>Agregar Banco</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instituciones Bancarias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TableFilter onFilterChange={setFilters} filterOptions={filterOptions} placeholder="Buscar por nombre..." />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Banco</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Créditos Activos</TableHead>
                  <TableHead>Monto Total</TableHead>
                  <TableHead>Tasa Promedio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((banco) => (
                    <TableRow key={banco.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{banco.nombre}</TableCell>
                      <TableCell>{banco.tipo}</TableCell>
                      <TableCell>{banco.creditosActivos}</TableCell>
                      <TableCell>{banco.montoTotal}</TableCell>
                      <TableCell>{banco.tasaPromedio}</TableCell>
                      <TableCell>
                        <Badge variant={banco.estadoVariant}>{banco.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <TableActions
                          row={banco}
                          onView={handleViewBanco}
                          onEdit={handleEditBanco}
                          onDelete={handleDeleteBanco}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
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
        type="banco"
        action={modalState.action}
        data={modalState.data}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, data: null })}
        onSave={handleSaveBanco}
        onDelete={handleDeleteConfirm}
      />

      <AddModal type="banco" isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddBanco} />
    </div>
  )
}
