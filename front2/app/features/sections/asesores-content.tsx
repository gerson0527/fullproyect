
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TableFilter } from "@/components/table-filter/table-filter"
import { TableActions } from "@/components/table-actions/table-actions"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@/components/notifications-panel/notifications-panel"
import { AddModal } from "@/components/add-modals/add-modals"
import { ActionModals } from "@/components/action-modals/action-modals"

const initialAsesoresData = [
  {
    id: "1",
    nombre: "Ana Rodríguez",
    cargo: "Asesora Senior",
    creditos: 23,
    monto: "$1.2M",
    tasaAprobacion: 85,
    rendimiento: "Alto",
    email: "ana.rodriguez@creditpro.com",
    telefono: "+1 234 567 8900",
    sucursal: "Principal",
    fechaIngreso: "2022-01-15",
  },
  {
    id: "2",
    nombre: "Roberto Silva",
    cargo: "Asesor",
    creditos: 18,
    monto: "$890K",
    tasaAprobacion: 72,
    rendimiento: "Medio",
    email: "roberto.silva@creditpro.com",
    telefono: "+1 234 567 8901",
    sucursal: "Norte",
    fechaIngreso: "2022-03-20",
  },
  {
    id: "3",
    nombre: "Laura Martínez",
    cargo: "Asesora Junior",
    creditos: 15,
    monto: "$650K",
    tasaAprobacion: 78,
    rendimiento: "Medio",
    email: "laura.martinez@creditpro.com",
    telefono: "+1 234 567 8902",
    sucursal: "Sur",
    fechaIngreso: "2023-06-10",
  },
  {
    id: "4",
    nombre: "Carlos Mendoza",
    cargo: "Asesor Senior",
    creditos: 21,
    monto: "$1.1M",
    tasaAprobacion: 82,
    rendimiento: "Alto",
    email: "carlos.mendoza@creditpro.com",
    telefono: "+1 234 567 8903",
    sucursal: "Centro",
    fechaIngreso: "2021-11-05",
  },
  {
    id: "5",
    nombre: "Patricia Gómez",
    cargo: "Asesora",
    creditos: 16,
    monto: "$780K",
    tasaAprobacion: 75,
    rendimiento: "Medio",
    email: "patricia.gomez@creditpro.com",
    telefono: "+1 234 567 8904",
    sucursal: "Principal",
    fechaIngreso: "2022-08-12",
  },
  {
    id: "6",
    nombre: "Miguel Sánchez",
    cargo: "Asesor Junior",
    creditos: 12,
    monto: "$520K",
    tasaAprobacion: 68,
    rendimiento: "Bajo",
    email: "miguel.sanchez@creditpro.com",
    telefono: "+1 234 567 8905",
    sucursal: "Norte",
    fechaIngreso: "2023-02-28",
  },
]

const filterOptions = [
  {
    key: "cargo",
    label: "Cargo",
    options: [
      { label: "Senior", value: "Senior" },
      { label: "Asesor", value: "Asesor" },
      { label: "Junior", value: "Junior" },
    ],
  },
  {
    key: "rendimiento",
    label: "Rendimiento",
    options: [
      { label: "Alto", value: "Alto" },
      { label: "Medio", value: "Medio" },
      { label: "Bajo", value: "Bajo" },
    ],
  },
  {
    key: "sucursal",
    label: "Sucursal",
    options: [
      { label: "Principal", value: "Principal" },
      { label: "Norte", value: "Norte" },
      { label: "Sur", value: "Sur" },
      { label: "Centro", value: "Centro" },
    ],
  },
]

interface AsesoresContentProps {
  onAddNotification?: (notification: Omit<Notification, "id" | "timestamp">) => void
}

export function AsesoresContent({ onAddNotification }: AsesoresContentProps) {
  const [asesoresData, setAsesoresData] = useState(initialAsesoresData)
  const [filters, setFilters] = useState<Record<string, string>>({})
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

  // Filtrar datos
  const filteredData = asesoresData.filter((asesor) => {
    // Filtro de búsqueda
    if (filters.search && !asesor.nombre.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Filtro de cargo
    if (filters.cargo) {
      if (filters.cargo === "Senior" && !asesor.cargo.includes("Senior")) return false
      if (filters.cargo === "Asesor" && asesor.cargo !== "Asesor" && asesor.cargo !== "Asesora") return false
      if (filters.cargo === "Junior" && !asesor.cargo.includes("Junior")) return false
    }

    // Filtro de rendimiento
    if (filters.rendimiento && asesor.rendimiento !== filters.rendimiento) {
      return false
    }

    // Filtro de sucursal
    if (filters.sucursal && asesor.sucursal !== filters.sucursal) {
      return false
    }

    return true
  })

  // Generar nuevo ID
  const generateNewId = () => {
    const maxId = Math.max(...asesoresData.map((a) => Number.parseInt(a.id)))
    return (maxId + 1).toString()
  }

  // Handlers para acciones
  const handleViewAsesor = (asesor: any) => {
    setModalState({ isOpen: true, action: "view", data: asesor })
  }

  const handleEditAsesor = (asesor: any) => {
    setModalState({ isOpen: true, action: "edit", data: asesor })
  }

  const handleDeleteAsesor = (asesor: any) => {
    setModalState({ isOpen: true, action: "delete", data: asesor })
  }

  const handleSaveAsesor = (data: any) => {
    setAsesoresData((prev) => prev.map((asesor) => (asesor.id === data.id ? { ...data } : asesor)))

    toast({
      title: "Asesor actualizado",
      description: `Los datos de ${data.nombre} han sido actualizados correctamente.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "success",
        title: "Asesor actualizado",
        description: `Se actualizó la información de ${data.nombre}`,
        read: false,
      })
    }
  }

  const handleDeleteConfirm = () => {
    const asesorName = modalState.data?.nombre
    const asesorId = modalState.data?.id

    setAsesoresData((prev) => prev.filter((asesor) => asesor.id !== asesorId))

    toast({
      title: "Asesor eliminado",
      description: `${asesorName} ha sido eliminado del sistema.`,
      variant: "destructive",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "warning",
        title: "Asesor eliminado",
        description: `Se eliminó a ${asesorName} del equipo`,
        read: false,
      })
    }
  }

  const handleAddAsesor = (data: any) => {
    const newId = generateNewId()
    const newAsesor = {
      ...data,
      id: newId,
      creditos: 0,
      monto: "$0K",
      tasaAprobacion: 0,
      rendimiento: "Nuevo",
    }

    setAsesoresData((prev) => [newAsesor, ...prev])

    toast({
      title: "Asesor agregado",
      description: `${data.nombre} ha sido agregado al equipo correctamente.`,
      variant: "success",
    })

    if (onAddNotification) {
      onAddNotification({
        type: "success",
        title: "Nuevo asesor agregado",
        description: `Se registró a ${data.nombre} en el equipo`,
        read: false,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Equipo de Asesores</h2>
        <Button onClick={() => setAddModalOpen(true)}>Nuevo Asesor</Button>
      </div>

      <div className="space-y-4">
        <TableFilter onFilterChange={setFilters} filterOptions={filterOptions} placeholder="Buscar por nombre..." />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((asesor) => (
            <Card key={asesor.id} className="relative">
              <div className="absolute right-2 top-2">
                <TableActions
                  row={asesor}
                  onView={handleViewAsesor}
                  onEdit={handleEditAsesor}
                  onDelete={handleDeleteAsesor}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{asesor.nombre}</CardTitle>
                <CardDescription>{asesor.cargo}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Créditos este mes:</span>
                    <span className="font-medium">{asesor.creditos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monto gestionado:</span>
                    <span className="font-medium">{asesor.monto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tasa de aprobación:</span>
                    <span className="font-medium">{asesor.tasaAprobacion}%</span>
                  </div>
                  <Progress value={asesor.tasaAprobacion} className="mt-2" />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">Rendimiento:</span>
                    <span
                      className={`font-medium ${
                        asesor.rendimiento === "Alto"
                          ? "text-green-600"
                          : asesor.rendimiento === "Medio"
                            ? "text-amber-600"
                            : asesor.rendimiento === "Nuevo"
                              ? "text-blue-600"
                              : "text-red-600"
                      }`}
                    >
                      {asesor.rendimiento}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No se encontraron asesores con los filtros seleccionados.
          </div>
        )}
      </div>

      <ActionModals
        type="asesor"
        action={modalState.action}
        data={modalState.data}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null, data: null })}
        onSave={handleSaveAsesor}
        onDelete={handleDeleteConfirm}
      />

      <AddModal type="asesor" isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddAsesor} />
    </div>
  )
}
