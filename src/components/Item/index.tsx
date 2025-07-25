import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconEdit,
  IconTrashX,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import { Group, Paper, Text, ThemeIcon, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import classes from './Item.module.css'
import type { EventoType } from '@/types/evento'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DataRepo from '@/api/datasource'

type ItemProps = {
  data: EventoType
}

export default function Item(props: ItemProps) {
  const { id, nombre, descripcion, monto, fecha, tipo, adjunto } = props.data
  const DiffIcon = tipo === 'ingreso' ? IconArrowUpRight : IconArrowDownRight
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: async () => {
      const response = await DataRepo.eliminarEvento(id)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const navigate = useNavigate()

  const confirmarEdicion = () =>
    modals.openConfirmModal({
      title: 'Editar Evento?',
      centered: true,
      children: <Text size="sm">Deseas Editar el Evento {nombre}?</Text>,
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => navigate({ to: '/evento/$id', params: { id } }),
    })

  const confirmarEliminar = () =>
    modals.openConfirmModal({
      title: 'Eliminar Evento?',
      centered: true,
      children: <Text size="sm">Deseas Eliminar el Evento {nombre}?</Text>,
      labels: { confirm: 'Confirmar', cancel: 'Cancelar' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        mutationDelete.mutate()
      },
    })

  return (
    <Paper key={id} mt={4} p={4}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {nombre}
        </Text>
        <Group justify="space-between">
          <ActionIcon color="red" size={24}>
            <IconTrashX size={20} stroke={1.5} onClick={confirmarEliminar} />
          </ActionIcon>
          <ActionIcon size={24}>
            <IconEdit size={20} stroke={1.5} onClick={confirmarEdicion} />
          </ActionIcon>
        </Group>
      </Group>

      <Group justify="space-between" gap="xs" mt={10}>
        <Group align="flex-end">
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                tipo === 'ingreso'
                  ? 'var(--mantine-color-teal-6)'
                  : 'var(--mantine-color-red-6)',
            }}
            size={26}
            radius="md"
          >
            <DiffIcon size={25} stroke={1.5} />
          </ThemeIcon>
          <Text
            c={tipo === 'ingreso' ? 'teal' : 'red'}
            fz="h3"
            fw={500}
            className={classes.diff}
          >
            ${monto}
          </Text>
        </Group>
        <Text fz="xs" c="dimmed">
          {dayjs.unix(fecha).format('YYYY-MM-DD')}
        </Text>
      </Group>
    </Paper>
  )
}
