export type AppRole = 'admin' | 'client'

export type AdminSection =
  | 'home'
  | 'client-add'
  | 'client-search'
  | 'client-list'
  | 'car-add'
  | 'car-search'
  | 'car-list'
  | 'service-add'
  | 'service-search'
  | 'service-list'
  | 'help'

export interface ClientRecord {
  id: string
  idType: string
  idNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface CarRecord {
  id: string
  plate: string
  make: string
  model: string
}

export interface ServiceRecord {
  id: string
  plate: string
  service: string
  date: string
  clientId?: string
}

export const demoVehicleServices: ServiceRecord[] = [
  { id: 'SRV-028', plate: 'ABC-123', service: 'Cambio de Aceite', date: '28/09/2026' },
  { id: 'SRV-015', plate: 'ABC-123', service: 'Alineación y Balanceo', date: '15/08/2026' },
]

export const demoClientServices = [
  { id: 'HST-042', date: '30/09/2026', service: 'Cambio de Aceite', vehicle: 'Toyota Corolla · XYZ789' },
  { id: 'HST-028', date: '28/09/2026', service: 'Lavado', vehicle: 'Toyota Corolla · XYZ789' },
  { id: 'HST-015', date: '15/08/2026', service: 'Alineación', vehicle: 'Toyota Corolla · XYZ789' },
]
