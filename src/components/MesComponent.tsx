import { Card, Paper, Group, Text } from '@mantine/core'
import Item from '@/components/Item'
import dayjs from 'dayjs'
import ItemTotal from './ItemTotal'

export default function MesComponent() {
  return (
    <Card>
      <Text>{dayjs().format('MMMM')}</Text>
      <Item Titulo="Groceries" Valor={200} Fecha={dayjs().unix()} />
      <Item Titulo="Groceries" Valor={200} Fecha={dayjs().unix()} />
      <Item Titulo="Groceries" Valor={200} Fecha={dayjs().unix()} />
      <Paper shadow="xs" p="xl">
        <ItemTotal nombre="Income" valor="1000" />
        <ItemTotal nombre="Expense" valor="1000" />
        <ItemTotal nombre="Monthly" valor="1000" />
        <ItemTotal nombre="Global" valor="1000" />
      </Paper>
    </Card>
  )
}
