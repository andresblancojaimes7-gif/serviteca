import { useState } from 'react'
import { AdminDashboard } from './components/AdminDashboard'
import { ClientPortal } from './components/ClientPortal'
import { DeviceFrame } from './components/DeviceFrame'
import { LoginPage } from './components/LoginPage'
import type { AppRole, CarRecord, ClientRecord, ServiceRecord } from './types'

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString().slice(-6)}`
}

function AppContent() {
  const [screen, setScreen] = useState<'login' | AppRole>('login')
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [cars, setCars] = useState<CarRecord[]>([])
  const [services, setServices] = useState<ServiceRecord[]>([])

  function saveClient(record: Omit<ClientRecord, 'id'>) {
    setClients((current) => [...current, { ...record, id: makeId('CLI') }])
  }

  function saveCar(record: Omit<CarRecord, 'id'>) {
    setCars((current) => [...current, { ...record, id: makeId('AUT') }])
  }

  function saveService(record: Omit<ServiceRecord, 'id'>) {
    setServices((current) => [...current, { ...record, id: makeId('SRV') }])
  }

  if (screen === 'login') return <LoginPage onEnter={setScreen} />
  if (screen === 'client') return <ClientPortal onLogout={() => setScreen('login')} />

  return (
    <AdminDashboard
      onLogout={() => setScreen('login')}
      clients={clients}
      cars={cars}
      services={services}
      onClientSaved={saveClient}
      onCarSaved={saveCar}
      onServiceSaved={saveService}
    />
  )
}

function App() {
  const isEmbedded = window.self !== window.top
  const isCompactViewport = window.matchMedia('(max-width: 560px)').matches

  if (!isEmbedded && !isCompactViewport) return <DeviceFrame />
  return <AppContent />
}

export default App
