import dayjs from 'dayjs'
import type { EventoType } from '@/types/evento'
import type { MesType } from '@/types/mes'

export const crearMeses = async (
  balanceInicial: number,
  eventos?: EventoType[],
) => {
  const meses: Array<MesType> = []

  if (!eventos?.length) return meses

  const eventosXmes = eventos.reduce(
    (acc, evento) => {
      const fecha = dayjs.unix(evento.fecha)
      const mes = fecha.month()
      const anio = fecha.year()

      const key = `${mes}-${anio}`

      if (!acc[key]) {
        acc[key] = []
      }

      acc[key].push(evento)

      return acc
    },
    {} as Record<string, Array<EventoType>>,
  )

  for (const key in eventosXmes) {
    const [mes_titulo, anio] = key.split('-')
    const eventos = eventosXmes[key]
    const balance = eventos.reduce(
      (acc, evento) => {
        acc[evento.tipo] += evento.monto
        return acc
      },
      { ingreso: 0, gasto: 0 },
    )

    const total = balance.ingreso - balance.gasto

    meses.push({
      titulo: dayjs(anio + '-' + mes_titulo + '-1').format('MMMM'),
      mes: dayjs().month(Number(mes_titulo)).month(),
      anio: Number(anio),
      eventos,
      flujo: {
        ingreso: balance.ingreso,
        gasto: balance.gasto,
        mensual: total,
        global: 0,
      },
    })
  }

  const mesesOrdenados = meses.sort((a, b) => b.mes - a.mes)
  let indice = 0

  for (const mes of mesesOrdenados) {
    const mesPrevio = mesesOrdenados[indice - 1]

    if (mesPrevio) {
      mes.flujo.global = mesPrevio.flujo.global + mes.flujo.mensual
    } else {
      mes.flujo.global = mes.flujo.mensual + balanceInicial
    }

    indice++
  }

  return mesesOrdenados
}
