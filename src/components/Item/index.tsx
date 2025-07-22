import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
} from '@tabler/icons-react'
import { Group, Paper, Text, SimpleGrid } from '@mantine/core'
import classes from './Item.module.css'

type ItemProps = {
  Titulo: string
  Valor: number
  Fecha: number
}

export default function Item(props: ItemProps) {
  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
  }

  const Icon = icons['user']

  return (
    <Paper withBorder p="md" radius="md" key={props.Titulo}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {props.Titulo}
        </Text>
        <Icon className={classes.icon} size={22} stroke={1.5} />
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>{props.Valor}</Text>
        <Text
          c={props.Valor > 0 ? 'teal' : 'red'}
          fz="sm"
          fw={500}
          className={classes.diff}
        ></Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        dayjs(props.Fecha)
      </Text>
    </Paper>
  )
}
