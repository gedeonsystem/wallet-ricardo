import { Card, Paper, Group, Title, Container } from '@mantine/core'
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
    <Card shadow="xs" p="md">
      <Title order={4}>{titulo}</Title>
      {eventos.map((evento) => (
        <Item key={evento.id} data={evento}></Item>
      ))}
      <Paper mt={5} p={5}>
        <ItemTotal nombre="Income" valor={flujo.ingreso.toString()} />
        <ItemTotal nombre="Expense" valor={flujo.gasto.toString()} />
        <ItemTotal nombre="Monthly" valor={flujo.mensual.toString()} />
        <ItemTotal nombre="Global" valor={flujo.global.toString()} />
      </Paper>
    </Card>
  )
}
