import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import { Group, Paper, Text } from '@mantine/core'
import classes from './Item.module.css'
import type { EventoType } from '@/types/evento'

type ItemProps = {
  data: EventoType
}

export default function Item(props: ItemProps) {
  const { id, nombre, descripcion, monto, fecha, tipo, adjunto } = props.data
  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
  }

  const Icon = icons['user']

  return (
    <Paper withBorder p="md" radius="md" key={id}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {nombre}
        </Text>
        <Icon className={classes.icon} size={22} stroke={1.5} />
      </Group>

      <Group align="flex-end" gap="xs" mt={10}>
        <Text className={classes.value}>{monto}</Text>
        <Text
          c={tipo === 'ingreso' ? 'teal' : 'red'}
          fz="sm"
          fw={500}
          className={classes.diff}
        ></Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        {dayjs(fecha).format('DD/MM/YYYY').toString()}
      </Text>
    </Paper>
  )
}
