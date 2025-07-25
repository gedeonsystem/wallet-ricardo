import type { EventoCreateType, EventoType } from '@/types/evento'

abstract class DataDS {
  abstract cargarEventos(): Array<EventoType>

  abstract getEventos(): Promise<Array<EventoType>>

  abstract crearEvento(evento: EventoCreateType): Promise<boolean>

  abstract actualizarEvento(
    event: EventoCreateType,
    id: string,
  ): Promise<boolean>

  abstract eliminarEvento(id: string): Promise<boolean>

  abstract getEvento(id: string): Promise<EventoType>
}

export default DataDS
