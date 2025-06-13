"use client"

import { useState } from "react"
import { Plus, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AddModalProps {
  type: "cliente" | "banco" | "asesor" | "financiera" | "objetivo" | "credito"
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export function AddModal({ type, isOpen, onClose, onSave }: AddModalProps) {
  const [formData, setFormData] = useState<any>({})

  const handleSave = () => {
    onSave(formData)
    setFormData({})
    onClose()
  }

  const handleClose = () => {
    setFormData({})
    onClose()
  }

  const renderForm = () => {
    switch (type) {
      case "credito":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nombre del cliente"
                  value={formData.cliente || ""}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monto">Monto solicitado *</Label>
                <Input
                  id="monto"
                  type="number"
                  placeholder="50000"
                  value={formData.monto || ""}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de crédito *</Label>
                <Select
                  value={formData.tipo || ""}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Vehicular">Vehicular</SelectItem>
                    <SelectItem value="Hipotecario">Hipotecario</SelectItem>
                    <SelectItem value="Empresarial">Empresarial</SelectItem>
                    <SelectItem value="Microcrédito">Microcrédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="banco">Banco/Financiera *</Label>
                <Select
                  value={formData.banco || ""}
                  onValueChange={(value) => setFormData({ ...formData, banco: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar institución" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banco Nacional">Banco Nacional</SelectItem>
                    <SelectItem value="Banco Popular">Banco Popular</SelectItem>
                    <SelectItem value="Banco Internacional">Banco Internacional</SelectItem>
                    <SelectItem value="Banco Regional">Banco Regional</SelectItem>
                    <SelectItem value="Financiera ABC">Financiera ABC</SelectItem>
                    <SelectItem value="Hogar Financiera">Hogar Financiera</SelectItem>
                    <SelectItem value="MicroFinanzas Plus">MicroFinanzas Plus</SelectItem>
                    <SelectItem value="Financiera Rápida">Financiera Rápida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asesor">Asesor asignado *</Label>
                <Select
                  value={formData.asesor || ""}
                  onValueChange={(value) => setFormData({ ...formData, asesor: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar asesor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ana Rodríguez">Ana Rodríguez</SelectItem>
                    <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                    <SelectItem value="Roberto Silva">Roberto Silva</SelectItem>
                    <SelectItem value="Laura Martínez">Laura Martínez</SelectItem>
                    <SelectItem value="Patricia Gómez">Patricia Gómez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plazo">Plazo (meses) *</Label>
                <Select
                  value={formData.plazo || ""}
                  onValueChange={(value) => setFormData({ ...formData, plazo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="48">48 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tasa">Tasa de interés (%)</Label>
                <Input
                  id="tasa"
                  type="number"
                  step="0.1"
                  placeholder="12.5"
                  value={formData.tasa || ""}
                  onChange={(e) => setFormData({ ...formData, tasa: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="garantia">Tipo de garantía</Label>
                <Select
                  value={formData.garantia || ""}
                  onValueChange={(value) => setFormData({ ...formData, garantia: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar garantía" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nómina">Nómina</SelectItem>
                    <SelectItem value="Aval">Aval</SelectItem>
                    <SelectItem value="Hipotecaria">Hipotecaria</SelectItem>
                    <SelectItem value="Vehículo">Vehículo</SelectItem>
                    <SelectItem value="Inmueble">Inmueble</SelectItem>
                    <SelectItem value="Sin garantía">Sin garantía</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado inicial</Label>
                <Select
                  value={formData.estado || "Pendiente"}
                  onValueChange={(value) => setFormData({ ...formData, estado: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Revisión">En Revisión</SelectItem>
                    <SelectItem value="Documentos Pendientes">Documentos Pendientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaSolicitud">Fecha de solicitud</Label>
                <Input
                  id="fechaSolicitud"
                  type="date"
                  value={formData.fechaSolicitud || ""}
                  onChange={(e) => setFormData({ ...formData, fechaSolicitud: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                placeholder="Notas adicionales sobre el crédito..."
                value={formData.observaciones || ""}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      case "cliente":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  placeholder="Juan Rodriguez"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  placeholder="Perez Gonzales"
                  value={formData.apellido || ""}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.perez@email.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  placeholder="+1 234 567 8900"
                  value={formData.telefono || ""}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identificacion">Identificación</Label>
                <Input
                  id="dni"
                  placeholder="12345678"
                  value={formData.dni || ""}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechanacimiento">Fecha de nacimiento</Label>
                <Input
                  id="fechanacimiento"
                  type="date"
                  value={formData.fechanacimiento || ""}
                  onChange={(e) => setFormData({ ...formData, fechanacimiento: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado inicial</Label>
                <Select
                  value={formData.estado || ""}
                  onValueChange={(value) => setFormData({ ...formData, estado: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ingresos">Ingresos mensuales</Label>
                <Input
                  id="ingresos"
                  type="number"
                  placeholder="50000"
                  value={formData.ingresos || ""}
                  onChange={(e) => setFormData({ ...formData, ingresos: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Textarea
                id="direccion"
                placeholder="Calle 123, Ciudad, País"
                value={formData.direccion || ""}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        )

      case "asesor":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo *</Label>
                <Input
                  id="nombre"
                  placeholder="Ana Rodríguez"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ana.rodriguez@creditpro.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="+1 234 567 8900"
                  value={formData.telefono || ""}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Select
                  value={formData.cargo || ""}
                  onValueChange={(value) => setFormData({ ...formData, cargo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asesor Junior">Asesor Junior</SelectItem>
                    <SelectItem value="Asesor">Asesor</SelectItem>
                    <SelectItem value="Asesor Senior">Asesor Senior</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sucursal">Sucursal</Label>
                <Select
                  value={formData.sucursal || ""}
                  onValueChange={(value) => setFormData({ ...formData, sucursal: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Norte">Norte</SelectItem>
                    <SelectItem value="Sur">Sur</SelectItem>
                    <SelectItem value="Centro">Centro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaIngreso">Fecha de ingreso</Label>
                <Input
                  id="fechaIngreso"
                  type="date"
                  value={formData.fechaIngreso || ""}
                  onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experiencia">Experiencia previa</Label>
              <Textarea
                id="experiencia"
                placeholder="Describe la experiencia previa del asesor..."
                value={formData.experiencia || ""}
                onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      case "banco":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del banco *</Label>
                <Input
                  id="nombre"
                  placeholder="Banco Nacional"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de banco *</Label>
                <Select
                  value={formData.tipo || ""}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Regional">Regional</SelectItem>
                    <SelectItem value="Internacional">Internacional</SelectItem>
                    <SelectItem value="Cooperativo">Cooperativo</SelectItem>
                    <SelectItem value="Especializado">Especializado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contacto">Persona de contacto</Label>
                <Input
                  id="contacto"
                  placeholder="María García"
                  value={formData.contacto || ""}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="+1 234 567 8900"
                  value={formData.telefono || ""}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@banco.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tasaBase">Tasa base (%)</Label>
                <Input
                  id="tasaBase"
                  type="number"
                  step="0.1"
                  placeholder="12.5"
                  value={formData.tasaBase || ""}
                  onChange={(e) => setFormData({ ...formData, tasaBase: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Textarea
                id="direccion"
                placeholder="Dirección de la oficina principal..."
                value={formData.direccion || ""}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        )

      case "financiera":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la financiera *</Label>
                <Input
                  id="nombre"
                  placeholder="Financiera ABC"
                  value={formData.nombre || ""}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="especializacion">Especialización</Label>
                <Select
                  value={formData.especializacion || ""}
                  onValueChange={(value) => setFormData({ ...formData, especializacion: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Créditos personales">Créditos personales</SelectItem>
                    <SelectItem value="Microcréditos">Microcréditos</SelectItem>
                    <SelectItem value="Créditos vehiculares">Créditos vehiculares</SelectItem>
                    <SelectItem value="Créditos hipotecarios">Créditos hipotecarios</SelectItem>
                    <SelectItem value="Créditos empresariales">Créditos empresariales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contacto">Persona de contacto</Label>
                <Input
                  id="contacto"
                  placeholder="Carlos López"
                  value={formData.contacto || ""}
                  onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  placeholder="+1 234 567 8900"
                  value={formData.telefono || ""}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@financiera.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tasaPromedio">Tasa promedio (%)</Label>
                <Input
                  id="tasaPromedio"
                  type="number"
                  step="0.1"
                  placeholder="15.8"
                  value={formData.tasaPromedio || ""}
                  onChange={(e) => setFormData({ ...formData, tasaPromedio: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe los servicios y características de la financiera..."
                value={formData.descripcion || ""}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      case "objetivo":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del objetivo *</Label>
                <Input
                  id="titulo"
                  placeholder="Créditos aprobados Q1"
                  value={formData.titulo || ""}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de objetivo</Label>
                <Select
                  value={formData.tipo || ""}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Créditos">Número de créditos</SelectItem>
                    <SelectItem value="Monto">Monto desembolsado</SelectItem>
                    <SelectItem value="Clientes">Nuevos clientes</SelectItem>
                    <SelectItem value="Tasa">Tasa de aprobación</SelectItem>
                    <SelectItem value="Comisiones">Comisiones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta">Meta numérica *</Label>
                <Input
                  id="meta"
                  type="number"
                  placeholder="200"
                  value={formData.meta || ""}
                  onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidad">Unidad</Label>
                <Select
                  value={formData.unidad || ""}
                  onValueChange={(value) => setFormData({ ...formData, unidad: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cantidad">Cantidad</SelectItem>
                    <SelectItem value="pesos">Pesos</SelectItem>
                    <SelectItem value="dolares">Dólares</SelectItem>
                    <SelectItem value="porcentaje">Porcentaje</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio || ""}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha límite</Label>
                <Input
                  id="fechaFin"
                  type="date"
                  value={formData.fechaFin || ""}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsable">Responsable</Label>
                <Select
                  value={formData.responsable || ""}
                  onValueChange={(value) => setFormData({ ...formData, responsable: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipo completo">Equipo completo</SelectItem>
                    <SelectItem value="Ana Rodríguez">Ana Rodríguez</SelectItem>
                    <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                    <SelectItem value="Roberto Silva">Roberto Silva</SelectItem>
                    <SelectItem value="Laura Martínez">Laura Martínez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prioridad">Prioridad</Label>
                <Select
                  value={formData.prioridad || ""}
                  onValueChange={(value) => setFormData({ ...formData, prioridad: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe el objetivo y cómo se medirá el éxito..."
                value={formData.descripcion || ""}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      default:
        return <p>Formulario no disponible</p>
    }
  }

  const getTitle = () => {
    const typeText = {
      cliente: "Nuevo Cliente",
      asesor: "Nuevo Asesor",
      banco: "Nuevo Banco",
      financiera: "Nueva Financiera",
      objetivo: "Nuevo Objetivo",
      credito: "Nuevo Crédito",
    }
    return typeText[type] || "Nuevo Registro"
  }

  const getDescription = () => {
    const descriptions = {
      cliente: "Agrega un nuevo cliente al sistema de gestión de créditos.",
      asesor: "Registra un nuevo asesor en el equipo de trabajo.",
      banco: "Agrega una nueva institución bancaria como aliado comercial.",
      financiera: "Registra una nueva financiera para ampliar las opciones de crédito.",
      objetivo: "Define un nuevo objetivo para el equipo o la empresa.",
      credito: "Registra una nueva solicitud de crédito en el sistema.",
    }
    return descriptions[type] || "Completa la información para crear un nuevo registro."
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        {renderForm()}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
