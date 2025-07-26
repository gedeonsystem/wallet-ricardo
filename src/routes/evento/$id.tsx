import {
  Card,
  FileInput,
  Select,
  Button,
  Container,
  TextInput,
  NumberInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  EventoCreateSchema,
  type EventoCreateType,
  type EventoType,
} from '@/types/evento'
import DataRepo from '@/api/datasource'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { notifications } from '@mantine/notifications'

export const Route = createFileRoute('/evento/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const opciones = ['ingreso', 'gasto']
  const { id } = useParams({ from: '/evento/$id' })

  const navigate = useNavigate()
  const mode = id === 'new' ? 'new' : 'edit'

  const eventoQuery = useQuery<EventoCreateType, Error>({
    queryKey: ['GET_EVENTO'],
    queryFn: async () => {
      const response = await DataRepo.getEvento(id)
      return response
    },
    enabled: mode === 'edit' ? true : false,
  })

  const defaultValues: EventoCreateType = {
    nombre: '',
    descripcion: '',
    fecha: dayjs().unix(),
    monto: 0,
    tipo: 'ingreso',
    adjunto: '',
  }

  const [guardado, setGuardado] = useState<boolean>(false)
  const [tipoevento, setTipoevento] = useState<string>('')
  const [fechaEvento, setFechaEvento] = useState<string>()
  const [adjunto, setAdjunto] = useState<File>()

  const mutationSave = useMutation({
    mutationFn: async (data: EventoCreateType) => {
      setGuardado(true)
      console.log('guardando')
      data.fecha = dayjs(fechaEvento).unix()
      if (tipoevento === 'ingreso') data.tipo = 'ingreso'
      else data.tipo = 'gasto'
      data.adjunto = (await getBase64(adjunto)) + ''
      const response = await DataRepo.createEvento(data)
      return response
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data: EventoCreateType) => {
      console.log(data)
      const response = await DataRepo.actualizarEvento(data, id)
      return response
    },
  })

  React.useEffect(() => {
    if (mode === 'new' || !eventoQuery.data) {
      return
    }
    formEvento.setFieldValue('nombre', eventoQuery.data.nombre)
    formEvento.setFieldValue('descripcion', eventoQuery.data.descripcion)
    formEvento.setFieldValue('monto', eventoQuery.data.monto)
    setTipoevento(eventoQuery.data.tipo)
    setFechaEvento(dayjs.unix(eventoQuery.data.fecha).format('YYYY-MM-DD'))
    //setAdjunto(eventoQuery.data.adjunto)
  }, [eventoQuery.data, mode])

  const formEvento = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: EventoCreateSchema,
    },
    onSubmit: (values) => {
      if (mode === 'edit') {
        mutationUpdate.mutate(values.value)
      } else {
        mutationSave.mutate(values.value)
      }
    },
    onSubmitInvalid(values) {
      console.error('Error en el formulario', formEvento.state.errors[0])
    },
  })

  return (
    <Container my="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <formEvento.Field
            name="nombre"
            children={(field) => (
              <div>
                <TextInput
                  label="Nombre"
                  placeholder="Nombre del Evento"
                  value={field.state.value + ''}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-sm mt-1" role="alert">
                    {field.state.meta.errors.map((e) => e?.message)}
                  </em>
                )}
              </div>
            )}
          />
          <formEvento.Field
            name="descripcion"
            children={(field) => (
              <div>
                <TextInput
                  label="Descripcion"
                  placeholder="Descripcion del Evento"
                  value={field.state.value + ''}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-sm mt-1" role="alert">
                    {field.state.meta.errors.map((e) => e?.message)}
                  </em>
                )}
              </div>
            )}
          />

          <formEvento.Field
            name="fecha"
            children={(field) => (
              <div>
                <DateInput
                  valueFormat="YYYY-MM-DD"
                  label="Fecha"
                  placeholder="Selecciona una Fecha"
                  value={fechaEvento}
                  onChange={setFechaEvento}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-sm mt-1" role="alert">
                    {field.state.meta.errors.map((e) => e?.message)}
                  </em>
                )}
              </div>
            )}
          />

          <formEvento.Field
            name="monto"
            children={(field) => (
              <div>
                <NumberInput
                  label="Monto"
                  placeholder="$0"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.valueOf()))}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-sm mt-1" role="alert">
                    {field.state.meta.errors.map((e) => e?.message)}
                  </em>
                )}
              </div>
            )}
          />

          <formEvento.Field
            name="tipo"
            children={(field) => (
              <div>
                <Select
                  label="Tipo"
                  data={opciones}
                  value={tipoevento}
                  onChange={setTipoevento}
                />
                {!field.state.meta.isValid && (
                  <em className="text-red-500 text-sm mt-1" role="alert">
                    {field.state.meta.errors.map((e) => e?.message)}
                  </em>
                )}
              </div>
            )}
          />

          <formEvento.Field
            name="adjunto"
            children={(field) => (
              <FileInput
                accept="image/png,image/jpeg"
                label="Archivo"
                placeholder="Archivo Adjunto"
                value={adjunto}
                onChange={setAdjunto}
              />
            )}
          />

          <Button
            disabled={guardado}
            fullWidth
            type="reset"
            onClick={(event) => {
              console.log('notificando')
              notifications.show({
                title: 'Wallet System',
                message: 'Se Guardo el evento 🌟',
              })
              event.preventDefault()
              formEvento.handleSubmit()
            }}
          >
            Enviar
          </Button>
        </form>
      </Card>
    </Container>
  )
}

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}
