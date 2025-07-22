import { useState } from 'react'
import Label from '@/components/Label'
import { DateTimePicker } from '@mantine/dates'
import { Card, FileInput, MultiSelect, Button, Container } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/evento/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const opciones = ['income', 'expense']

  return (
    <Container my="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form>
          <Label label="Nombre" placeholder="Nombre del Evento"></Label>
          <Label
            label="Descripcion"
            placeholder="Descripcion del Evento"
          ></Label>
          <DateTimePicker label="Fecha" placeholder="Selecciona una Fecha" />
          <Label label="Monto" placeholder="Monto"></Label>
          <MultiSelect
            label="Tipo"
            placeholder="Selecciona un Tipo"
            data={opciones}
          />
          <FileInput label="Archivo" placeholder="Archivo Adjunto" />
          <Button fullWidth variant="filled">
            Enviar
          </Button>
        </form>
      </Card>
    </Container>
  )
}
