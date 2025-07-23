import { z } from 'zod'
import { EventoSchema } from './evento'

export const MesSchema = z.object({
  titulo: z.string(),
  mes: z.number(),
  anio: z.number(),
  eventos: z.array(EventoSchema),
  flujo: z.object({
    ingreso: z.number(),
    gasto: z.number(),
    mensual: z.number(),
    global: z.number(),
  }),
})

export type MesType = z.infer<typeof MesSchema>
