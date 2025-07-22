import { Group, Text } from '@mantine/core'

type ItemTotalProps = {
  nombre: string
  valor: string
}

export default function ItemTotal(props: ItemTotalProps) {
  return (
    <Group justify="space-between">
      <Text c="blue">{props.nombre}</Text>
      <Text c="red">{props.valor}</Text>
    </Group>
  )
}
