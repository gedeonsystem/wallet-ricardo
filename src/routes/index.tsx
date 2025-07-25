import MesComponent from '@/components/MesComponent'
import {
  Button,
  Container,
  Flex,
  NumberInput,
  Text,
  Grid,
  useMantineTheme,
  MantineProvider,
} from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import type { EventoType } from '@/types/evento'
import type { MesType } from '@/types/mes'
import { useQuery } from '@tanstack/react-query'
import DataRepo from '@/api/datasource'
import { crearMeses } from '@/utils/Meses'
import React from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [balanceInicial, setBalanceInicial] = React.useState(0)

  const eventosQuery = useQuery<EventoType[], Error>({
    queryKey: ['GET_EVENTOS'],
    queryFn: async () => {
      const response = await DataRepo.getEventos()
      return response
    },
  })

  const mesQuery = useQuery<MesType[], Error, MesType[], [string, string]>({
    refetchOnMount: true,
    enabled: Boolean(eventosQuery.data),
    queryKey: ['CREAR_MESES', JSON.stringify(eventosQuery.data)],
    queryFn: async ({ queryKey }) => {
      const [, events] = queryKey
      const response = crearMeses(balanceInicial, JSON.parse(events))
      return response
    },
  })

  //const isLoading = isLoadingOrRefetchQuery(eventsQuery, monthsQuery)
  //const [prompt, setPrompt] = React.useState('What is the amount of my salary')
  const { data: eventos = [] } = eventosQuery
  const { data: meses = [] } = mesQuery

  const theme = useMantineTheme()

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container my="xl">
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          p={12}
        >
          <Text size="lg">Dinero Inicial</Text>
          <NumberInput
            min={0}
            value={balanceInicial}
            onChange={(value) => setBalanceInicial(Number(value))}
            placeholder={balanceInicial.toString()}
          />
          <Button
            onClick={() => {
              console.log('reiniciar')
              mesQuery.refetch()
            }}
            size="md"
          >
            Calcular
          </Button>
        </Flex>
        <Grid>
          {meses.map((mes) => (
            <Grid.Col span={4}>
              <MesComponent key={`${mes.mes}-${mes.anio}`} data={mes} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </MantineProvider>
  )
}
