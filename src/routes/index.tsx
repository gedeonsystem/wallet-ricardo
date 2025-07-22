import MesComponent from '@/components/MesComponent'
import { Button, Container, Flex, NumberInput, Text, Grid } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Container my="xl">
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Text size="lg">Dinero Inicial</Text>
        <NumberInput placeholder="0" />
        <Button size="md">Calcular</Button>
      </Flex>
      <Grid>
        <Grid.Col span={4}>
          <MesComponent></MesComponent>
        </Grid.Col>
        <Grid.Col span={4}>
          <MesComponent></MesComponent>
        </Grid.Col>
        <Grid.Col span={4}>
          <MesComponent></MesComponent>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
