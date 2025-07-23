import { v4 as uuid } from 'uuid'

import DataDS from '@/api/domain/ds/DataDS'

import type { EventoType, EventoCreateType } from '@/types/evento'
import dayjs from 'dayjs'

const defaultEvents: EventoType[] = [
  {
    id: uuid(),
    nombre: 'Salary',
    descripcion: 'Monthly salary',
    monto: 5000,
    fecha: dayjs('2024-12-15').unix(),
    tipo: 'ingreso',
  },
  {
    id: uuid(),
    nombre: 'Rent',
    descripcion: 'Monthly rent',
    monto: 1000,
    fecha: dayjs('2024-12-27').unix(),
    tipo: 'gasto',
  },
  {
    id: uuid(),
    nombre: 'Groceries',
    descripcion: 'Weekly groceries',
    monto: 200,
    fecha: dayjs('2024-12-29').unix(),
    tipo: 'ingreso',
  },
  {
    id: uuid(),
    nombre: 'Amazon shopping',
    descripcion: 'Bought some items on Amazon',
    monto: 200,
    fecha: dayjs('2025-01-15').unix(),
    tipo: 'gasto',
  },
  {
    id: uuid(),
    nombre: 'New brand RTX 5090',
    descripcion: "I won't never recovery financially from this",
    monto: 4800,
    fecha: dayjs('2025-01-15').unix(),
    tipo: 'ingreso',
  },
  {
    id: uuid(),
    nombre: 'Salary',
    descripcion: 'Weekly groceries',
    monto: 5000,
    fecha: dayjs('2025-01-20').unix(),
    tipo: 'ingreso',
  },
]

class LocalStorageDS extends DataDS {
  constructor() {
    super()

    const eventos = localStorage.getItem('eventos')
    if (!eventos) {
      localStorage.setItem('eventos', JSON.stringify(defaultEvents))
    }
  }

  cargarEventos(): EventoType[] {
    try {
      const eventosST = localStorage.getItem('eventos') || '[]'
      const eventos = JSON.parse(eventosST) as EventoType[]

      return eventos.sort((a, b) => b.fecha - a.fecha)
    } catch (error) {
      console.error('Error al cargar', error)
      throw new Error('Error al cargar')
    }
  }

  async getEventos(): Promise<EventoType[]> {
    try {
      return this.cargarEventos()
    } catch (error) {
      console.error('Error al cargar eventos', error)
      throw new Error('Error al cargar eventos')
    }
  }
  async crearEvento(evento: EventoCreateType) {
    try {
      const eventos = this.cargarEventos()

      const newEvento = {
        ...evento,
        id: uuid(),
        fecha: dayjs().unix(),
      }

      const newEventos = [...eventos, newEvento]

      localStorage.setItem('eventos', JSON.stringify(newEventos))

      return true
    } catch (error) {
      console.error('Error al crear Evento', error)
      throw new Error('Error al crear Evento')
    }
  }
  async actualizarEvento(evento: EventoType) {
    try {
      const eventos = this.cargarEventos()
      const Index = eventos.findIndex((e) => e.id === evento.id)

      if (Index === -1) {
        throw new Error('Evento no encontrado')
      }

      const newEventos = [...eventos]

      newEventos[Index] = {
        ...newEventos[Index],
        ...event,
      }

      console.log('Evento actualizado', newEventos[Index])

      localStorage.setItem('eventos', JSON.stringify(newEventos))

      return true
    } catch (error) {
      console.error('Error al actulizar eventos', error)
      throw new Error('Error al actulizar eventos')
    }
  }
  async eliminarEvento(id: string) {
    try {
      const eventos = this.cargarEventos()
      const newEventos = eventos.filter((e) => e.id !== id)
      localStorage.setItem('eventos', JSON.stringify(newEventos))

      return true
    } catch (error) {
      console.error('Error Error al eliminar Evento', error)
      throw new Error('Error Error al eliminar Evento')
    }
  }
  async getEvento(id: string) {
    try {
      const eventos = this.cargarEventos()
      const evento = eventos.find((e) => e.id === id)

      if (!evento) {
        throw new Error('Evento no Encontrado')
      }

      return evento
    } catch (error) {
      console.error('Evento no encontrado', error)
      throw new Error('Evento no encontrado')
    }
  }
}

export default LocalStorageDS
