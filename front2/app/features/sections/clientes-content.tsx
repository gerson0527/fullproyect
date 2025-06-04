
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TableFilter } from "@/components/table-filter/table-filter"
import { TableActions } from "@/components/table-actions/table-actions"
import { TablePagination } from "@/components/table-pagination/table-pagination"
import { useToast } from "@/hooks/use-toast"
import { ActionModals } from "@/components/action-modals/action-modals"
import type { Notification } from "@/components/notifications-panel/notifications-panel"
import { AddModal } from "@/components/add-modals/add-modals"

const initialClientesData = [
  {
    id: "1",
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+1 234 567 8900",
    creditosActivos: 2,
    estado: "Activo",
    estadoVariant: "default" as const,
  },
  {
    id: "2",
    nombre: "María García",
    email: "maria.garcia@email.com",
    telefono: "+1 234 567 8901",
    creditosActivos: 1,
    estado: "Pendiente",
    estadoVariant: "secondary" as const,
  },
  {
    id: "3",
    nombre: "Carlos López",
    email: "carlos.lopez@email.com",
    telefono: "+1 234 567 8902",
    creditosActivos: 0,
    estado: "Inactivo",
    estadoVariant: "destructive" as const,
  },
  {
    id: "4",
    nombre: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    telefono: "+1 234 567 8903",
    creditosActivos: 3,
    estado: "Activo",
    estadoVariant: "default" as const,
  },
  {
    id: "5",
    nombre: "Roberto Gómez",
    email: "roberto.gomez@email.com",
    telefono: "+1 234 567 8904",
    creditosActivos: 1,
    estado: "Activo",
    estadoVariant: "default" as const,
  },
  {
    id: "6",
    nombre: "Laura Martínez",
    email: "laura.martinez@email.com",
    telefono: "+1 234 567 8905",
    creditosActivos: 0,
    estado: "Inactivo",
    estadoVariant: "destructive" as const,
  },
  {
    id: "7",
    nombre: "Pedro Sánchez",
    email: "pedro.sanchez@email.com",
    telefono: "+1 234 567 8906",
    creditosActivos: 2,
    estado: "Activo",
    estadoVariant: "default" as const,
  },
]

const filterOptions = [
  {
    key: "estado",
    label: "Estado",
    options: [
      { label: "Activo", value: "Activo" },
      { label: "Pendiente", value: "Pendiente" },
      { label: "Inactivo", value: "Inactivo" },
    ],
  },
  {
    key: "creditosActivos",
    label: "Créditos Activos",
    options: [
      { label: "Sin créditos", value: "0" },
      { label: "1 crédito", value: "1" },
      { label: "2 o más", value: "2+" },
    ],
  },
]

interface ClientesContentProps {
  onAddNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
}

export function ClientesContent({ onAddNotification }: ClientesContentProps) {
  const [clientesData, setClientesData] = useState(initialClientesData)
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
  const filteredData = clientesData.filter((cliente) => {
    // Filtro de búsqueda
    if (
      filters.search &&
      !cliente.nombre.toLowerCase().includes(filters.search.toLowerCase()) &&
      !cliente.email.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Filtro de estado
    if (filters.estado && cliente.estado !== filters.estado) {
      return false
    }

    // Filtro de créditos activos
    if (filters.creditosActivos) {
      if (filters.creditosActivos === "0" && cliente.creditosActivos !== 0) return false
      if (filters.creditosActivos === "1" && cliente.creditosActivos !== 1) return false
      if (filters.creditosActivos === "2+" && cliente.creditosActivos < 2) return false
    }

    return true
  })

  // Paginación
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Generar nuevo ID
  const generateNewId = () => {
    const maxId = Math.max(...clientesData.map((c) => Number.parseInt(c.id)))
    return (maxId + 1).toString()
  }

  // Handlers para acciones
  const handleViewCliente = (cliente: any) => {
    setModalState({ isOpen: true, action: "view", data: cliente })
  }

  const handleEditCliente = (cliente: any) => {
    setModalState({ isOpen: true, action: "edit", data: cliente })
  }

  const handleDeleteCliente = (cliente: any) => {
    setModalState({ isOpen: true, action: "delete", data: cliente })
  }

  const handleSaveCliente = (data: any) => {
    setClientesData((prev) =>
      prev.map((cliente) =>
        cliente.id === data.id ? { ...data, estadoVariant: getEstadoVariant(data.estado) } : cliente,
      ),
    )

    toast({
      title: "Cliente actualizado",
      description: `Los datos de ${data.nombre} han sido actualizados correctamente.`,
      variant: "success",
    })

    onAddNotification({
      type: "success",
      title: "Cliente actualizado",
      description: `Se actualizó la información de ${data.nombre}`,
      read: false,
    })
  }

  const handleDeleteConfirm = () => {
    const clienteName = modalState.data?.nombre
    const clienteId = modalState.data?.id

    setClientesData((prev) => prev.filter((cliente) => cliente.id !== clienteId))

    toast({
      title: "Cliente eliminado",
      description: `${clienteName} ha sido eliminado del sistema.`,
      variant: "destructive",
    })

    onAddNotification({
      type: "warning",
      title: "Cliente eliminado",
      description: `Se eliminó a ${clienteName} del sistema`,
      read: false,
    })
  }

  const handleAddCliente = (data: any) => {
    const newId = generateNewId()
    const newCliente = {
      ...data,
      id: newId,
      creditosActivos: 0,
      estadoVariant: getEstadoVariant(data.estado || "Activo"),
    }

    setClientesData((prev) => [newCliente, ...prev])

    toast({
      title: "Cliente agregado",
      description: `${data.nombre} ha sido agregado al sistema correctamente.`,
      variant: "success",
    })

    onAddNotification({
      type: "success",
      title: "Nuevo cliente agregado",
      description: `Se registró a ${data.nombre} en el sistema`,
      read: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <Button onClick={() => setAddModalOpen(true)}>Nuevo Cliente</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Administra la información de tus clientes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TableFilter
            onFilterChange={setFilters}
            filterOptions={filterOptions}
            placeholder="Buscar por nombre o email..."
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Créditos Activos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{cliente.nombre}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>{cliente.telefono}</TableCell>
                      <TableCell>{cliente.creditosActivos}</TableCell>
                      <TableCell>
                        <Badge variant={cliente.estadoVariant}>{cliente.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        <TableActions
                          row={cliente}
                          onView={handleViewCliente}
                          onEdit={handleEditCliente}
                          onDelete={handleDeleteCliente}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
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
        type="cliente"
        action={modalState.action}
        data={modalState.data}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, data: null })}
        onSave={handleSaveCliente}
        onDelete={handleDeleteConfirm}
      />

      <AddModal type="cliente" isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddCliente} />
    </div>
  )
}
