import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader,CardDescription, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Notification } from "@/components/notifications-panel/notifications-panel"
import { useState } from "react"
import { AddModal } from "@/components/add-modals/add-modals"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/table-pagination/table-pagination"
import { TableActions } from "@/components/table-actions/table-actions"
import { TableFilter } from "@/components/table-filter/table-filter"
import { ActionModals } from "@/components/action-modals/action-modals"

// Define la interfaz para las propiedades del componentes ObjetivosContent
const initialObjetivosData = [
  {
    id: "1",
    titulo: "Créditos Aprobados Q1",
    tipo: "Créditos",
    meta: 200,
    actual: 156,
    unidad: "cantidad",
    responsable: "Equipo completo",
    fechaLimite: "2024-03-31",
    estado: "En progreso",
    estadoVariant: "secondary" as const,
    prioridad: "Alta",
    prioridadVariant: "destructive" as const,
    descripcion: "Meta trimestral de aprobación de créditos para Q1 2024",
  },
  {
    id: "2",
    titulo: "Monto Desembolsado Mensual",
    tipo: "Monto",
    meta: 4000000,
    actual: 3200000,
    unidad: "pesos",
    responsable: "Ana Rodríguez",
    fechaLimite: "2024-02-29",
    estado: "En progreso",
    estadoVariant: "secondary" as const,
    prioridad: "Alta",
    prioridadVariant: "destructive" as const,
    descripcion: "Objetivo de desembolso mensual para febrero",
  },
  {
    id: "3",
    titulo: "Nuevos Clientes Febrero",
    tipo: "Clientes",
    meta: 120,
    actual: 89,
    unidad: "cantidad",
    responsable: "Carlos Mendoza",
    fechaLimite: "2024-02-29",
    estado: "En progreso",
    estadoVariant: "secondary" as const,
    prioridad: "Media",
    prioridadVariant: "secondary" as const,
    descripcion: "Captación de nuevos clientes para el mes de febrero",
  },
  {
    id: "4",
    titulo: "Tasa de Aprobación Q1",
    tipo: "Tasa",
    meta: 85,
    actual: 78.5,
    unidad: "porcentaje",
    responsable: "Roberto Silva",
    fechaLimite: "2024-03-31",
    estado: "En progreso",
    estadoVariant: "secondary" as const,
    prioridad: "Media",
    prioridadVariant: "secondary" as const,
    descripcion: "Mejorar la tasa de aprobación de créditos en Q1",
  },
  {
    id: "5",
    titulo: "Comisiones Enero",
    tipo: "Comisiones",
    meta: 250000,
    actual: 256000,
    unidad: "pesos",
    responsable: "Laura Martínez",
    fechaLimite: "2024-01-31",
    estado: "Completado",
    estadoVariant: "default" as const,
    prioridad: "Baja",
    prioridadVariant: "outline" as const,
    descripcion: "Meta de comisiones para el mes de enero",
  },
  {
    id: "6",
    titulo: "Reducir Morosidad",
    tipo: "Tasa",
    meta: 3,
    actual: 4.8,
    unidad: "porcentaje",
    responsable: "Patricia Gómez",
    fechaLimite: "2024-06-30",
    estado: "Atrasado",
    estadoVariant: "destructive" as const,
    prioridad: "Alta",
    prioridadVariant: "destructive" as const,
    descripcion: "Reducir la tasa de morosidad por debajo del 3%",
  },
]

const filterOptions = [
  {
    key: "tipo",
    label: "Tipo",
    options: [
      { label: "Créditos", value: "Créditos" },
      { label: "Monto", value: "Monto" },
      { label: "Clientes", value: "Clientes" },
      { label: "Tasa", value: "Tasa" },
      { label: "Comisiones", value: "Comisiones" },
    ],
  },
  {
    key: "estado",
    label: "Estado",
    options: [
      { label: "En progreso", value: "En progreso" },
      { label: "Completado", value: "Completado" },
      { label: "Atrasado", value: "Atrasado" },
    ],
  },
  {
    key: "prioridad",
    label: "Prioridad",
    options: [
      { label: "Alta", value: "Alta" },
      { label: "Media", value: "Media" },
      { label: "Baja", value: "Baja" },
    ],
  },
  {
    key: "responsable",
    label: "Responsable",
    options: [
      { label: "Equipo completo", value: "Equipo completo" },
      { label: "Ana Rodríguez", value: "Ana Rodríguez" },
      { label: "Carlos Mendoza", value: "Carlos Mendoza" },
      { label: "Roberto Silva", value: "Roberto Silva" },
      { label: "Laura Martínez", value: "Laura Martínez" },
      { label: "Patricia Gómez", value: "Patricia Gómez" },
    ],
  },
]

interface ObjetivosContentProps {
  onAddNotification?: (notification: Omit<Notification, "id" | "timestamp">) => void
}

export function ObjetivosContent({ onAddNotification }: ObjetivosContentProps) {
  const [objetivosData, setObjetivosData] = useState(initialObjetivosData)
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

  // Generar variantes basadas en estado y prioridad
  const getEstadoVariant = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "default" as const
      case "Atrasado":
        return "destructive" as const
      default:
        return "secondary" as const
    }
  }

  const getPrioridadVariant = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "destructive" as const
      case "Media":
        return "secondary" as const
      default:
        return "outline" as const
    }
  }

  // Filtrar datos
  const filteredData = objetivosData.filter((objetivo) => {
    // Filtro de búsqueda
    if (
      filters.search &&
      !objetivo.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
      !objetivo.responsable.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Filtro de tipo
    if (filters.tipo && objetivo.tipo !== filters.tipo) {
      return false
    }

    // Filtro de estado
    if (filters.estado && objetivo.estado !== filters.estado) {
      return false
    }

    // Filtro de prioridad
    if (filters.prioridad && objetivo.prioridad !== filters.prioridad) {
      return false
    }

    // Filtro de responsable
    if (filters.responsable && objetivo.responsable !== filters.responsable) {
      return false
    }

    return true
  })

  // Paginación
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Calcular progreso
  const calcularProgreso = (objetivo: any) => {
    if (objetivo.tipo === "Tasa" && objetivo.titulo.includes("Reducir")) {
      // Para objetivos de reducción, el progreso es inverso
      return Math.max(0, Math.min(100, (objetivo.meta / objetivo.actual) * 100))
    }
    return Math.min(100, (objetivo.actual / objetivo.meta) * 100)
  }

  // Formatear valor
  const formatearValor = (valor: number, unidad: string) => {
    switch (unidad) {
      case "pesos":
        return `$${(valor / 1000000).toFixed(1)}M`
      case "porcentaje":
        return `${valor}%`
      default:
        return valor.toString()
    }
  }

  // Generar nuevo ID
  const generateNewId = () => {
    const maxId = Math.max(...objetivosData.map((o) => Number.parseInt(o.id)))
    return (maxId + 1).toString()
  }

  // Handlers para acciones
  const handleViewObjetivo = (objetivo: any) => {
    setModalState({ isOpen: true, action: "view", data: objetivo })
  }

  const handleEditObjetivo = (objetivo: any) => {
    setModalState({ isOpen: true, action: "edit", data: objetivo })
  }

  const handleDeleteObjetivo = (objetivo: any) => {
    setModalState({ isOpen: true, action: "delete", data: objetivo })
  }

  const handleSaveObjetivo = (data: any) => {
    setObjetivosData((prev) =>
      prev.map((objetivo) =>
        objetivo.id === data.id
          ? {
              ...data,
              estadoVariant: getEstadoVariant(data.estado),
              prioridadVariant: getPrioridadVariant(data.prioridad),
            }
          : objetivo,
      ),
    )

    toast({
      title: "Objetivo actualizado",
      description: `El objetivo "${data.titulo}" ha sido actualizado correctamente.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "success",
        title: "Objetivo actualizado",
        description: `Se actualizó el objetivo: ${data.titulo}`,
        read: false,
      })
    }
  }

  const handleDeleteConfirm = () => {
    const objetivoTitulo = modalState.data?.titulo
    const objetivoId = modalState.data?.id

    setObjetivosData((prev) => prev.filter((objetivo) => objetivo.id !== objetivoId))

    toast({
      title: "Objetivo eliminado",
      description: `El objetivo "${objetivoTitulo}" ha sido eliminado del sistema.`,
      variant: "destructive",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "warning",
        title: "Objetivo eliminado",
        description: `Se eliminó el objetivo: ${objetivoTitulo}`,
        read: false,
      })
    }
  }

  const handleAddObjetivo = (data: any) => {
    const newId = generateNewId()
    const newObjetivo = {
      ...data,
      id: newId,
      actual: 0,
      meta: Number(data.meta),
      estadoVariant: getEstadoVariant(data.estado || "En progreso"),
      prioridadVariant: getPrioridadVariant(data.prioridad || "Media"),
    }

    setObjetivosData((prev) => [newObjetivo, ...prev])

    toast({
      title: "Objetivo creado",
      description: `El objetivo "${data.titulo}" ha sido creado correctamente.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "info",
        title: "Nuevo objetivo creado",
        description: `Se creó el objetivo: ${data.titulo}`,
        read: false,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Objetivos y Metas</h2>
        <Button onClick={() => setAddModalOpen(true)}>Nuevo Objetivo</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Objetivos</CardTitle>
          <CardDescription>Administra y da seguimiento a los objetivos del equipo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TableFilter
            onFilterChange={setFilters}
            filterOptions={filterOptions}
            placeholder="Buscar por título o responsable..."
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Fecha Límite</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead className="w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((objetivo) => {
                    const progreso = calcularProgreso(objetivo)
                    return (
                      <TableRow key={objetivo.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{objetivo.titulo}</TableCell>
                        <TableCell>{objetivo.tipo}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{formatearValor(objetivo.actual, objetivo.unidad)}</span>
                              <span>{formatearValor(objetivo.meta, objetivo.unidad)}</span>
                            </div>
                            <Progress value={progreso} className="w-20" />
                            <div className="text-xs text-center">{Math.round(progreso)}%</div>
                          </div>
                        </TableCell>
                        <TableCell>{objetivo.responsable}</TableCell>
                        <TableCell>{new Date(objetivo.fechaLimite).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={objetivo.estadoVariant}>{objetivo.estado}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={objetivo.prioridadVariant}>{objetivo.prioridad}</Badge>
                        </TableCell>
                        <TableCell>
                          <TableActions
                            row={objetivo}
                            onView={handleViewObjetivo}
                            onEdit={handleEditObjetivo}
                            onDelete={handleDeleteObjetivo}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
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
        type="objetivo"
        action={modalState.action}
        data={modalState.data}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, data: null })}
        onSave={handleSaveObjetivo}
        onDelete={handleDeleteConfirm}
      />

      <AddModal
        type="objetivo"
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddObjetivo}
      />
    </div>
  )
}

