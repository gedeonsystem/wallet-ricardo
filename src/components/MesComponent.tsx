import { Card, Paper, Group, Text } from '@mantine/core'
import Item from '@/components/Item'
import dayjs from 'dayjs'
import ItemTotal from './ItemTotal'
import type { MesType } from '@/types/mes'

type MesProps = {
  data: MesType
}

export default function MesComponent(props: MesProps) {
  const { titulo, mes, flujo, eventos } = props.data

  return (
    <Card>
      <Text>{titulo}</Text>
      {eventos.map((evento) => (
        <Item key={evento.id} data={evento}></Item>
      ))}
      <Paper shadow="xs" p="xl">
        <ItemTotal nombre="Income" valor={flujo.ingreso.toString()} />
        <ItemTotal nombre="Expense" valor={flujo.gasto.toString()} />
        <ItemTotal nombre="Monthly" valor={flujo.mensual.toString()} />
        <ItemTotal nombre="Global" valor={flujo.global.toString()} />
      </Paper>
    </Card>
  )
}
