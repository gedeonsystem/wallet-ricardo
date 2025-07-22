import DataDS from '@/api/domain/ds/DataDS'

import type { EventoCreateType, EventoType } from '@/types/evento'

class DataRepo {
  private data: DataDS

  constructor(data: DataDS) {
    this.data = data
  }

  cargarEventos(): EventoType[] {
    return this.data.cargarEventos()
  }

  async getEventos(): Promise<Array<EventoType>> {
    return this.data.getEventos()
  }

  async createEvento(evento: EventoCreateType): Promise<boolean> {
    return this.data.crearEvento(evento)
  }

  async actualizarEvento(evento: EventoType): Promise<boolean> {
    return this.data.actualizarEvento(evento)
  }

  async eliminarEvento(id: string): Promise<boolean> {
    return this.data.eliminarEvento(id)
  }

  async getEvento(id: string): Promise<EventoType> {
    return this.data.getEvento(id)
  }
}

export default DataRepo
