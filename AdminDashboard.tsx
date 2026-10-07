import { useMemo, useState, type FormEvent } from 'react'
import type { AdminSection, CarRecord, ClientRecord, ServiceRecord } from '../types'
import { demoVehicleServices } from '../types'
import { Icon, type IconName } from './Icon'
import { ServiceLookup } from './ServiceLookup'

type AdminDashboardProps = {
  onLogout: () => void
  clients: ClientRecord[]
  cars: CarRecord[]
  services: ServiceRecord[]
  onClientSaved: (record: Omit<ClientRecord, 'id'>) => void
  onCarSaved: (record: Omit<CarRecord, 'id'>) => void
  onServiceSaved: (record: Omit<ServiceRecord, 'id'>) => void
}

type MenuGroup = { id: 'client' | 'car' | 'service'; label: string; icon: IconName; items: { label: string; section: AdminSection; icon: IconName }[] }

const menuGroups: MenuGroup[] = [
  { id: 'client', label: 'Clientes', icon: 'users', items: [{ label: 'Agregar', section: 'client-add', icon: 'plus' }, { label: 'Consultar', section: 'client-search', icon: 'search' }, { label: 'Listar', section: 'client-list', icon: 'list' }] },
  { id: 'car', label: 'Carros', icon: 'car', items: [{ label: 'Agregar', section: 'car-add', icon: 'plus' }, { label: 'Consultar', section: 'car-search', icon: 'search' }, { label: 'Listar', section: 'car-list', icon: 'list' }] },
  { id: 'service', label: 'Servicios', icon: 'wrench', items: [{ label: 'Agregar', section: 'service-add', icon: 'plus' }, { label: 'Consultar', section: 'service-search', icon: 'search' }, { label: 'Listar', section: 'service-list', icon: 'list' }] },
]

const adminBottomItems: { label: string; section: AdminSection; icon: IconName; activeSections: AdminSection[] }[] = [
  { label: 'Inicio', section: 'home', icon: 'home', activeSections: ['home'] },
  { label: 'Clientes', section: 'client-add', icon: 'users', activeSections: ['client-add', 'client-search', 'client-list'] },
  { label: 'Carros', section: 'car-add', icon: 'car', activeSections: ['car-add', 'car-search', 'car-list'] },
  { label: 'Servicios', section: 'service-add', icon: 'wrench', activeSections: ['service-add', 'service-search', 'service-list'] },
  { label: 'Ayuda', section: 'help', icon: 'help', activeSections: ['help'] },
]

const sectionInfo: Record<AdminSection, { title: string; eyebrow: string; subtitle: string }> = {
  home: { title: 'BUEN DÍA, ADMINISTRADOR', eyebrow: 'Panel principal', subtitle: 'Te damos la bienvenida. Gestiona clientes, carros y servicios desde un solo lugar.' },
  'client-add': { title: 'Agregar Cliente', eyebrow: 'Clientes / Registro', subtitle: 'Registra un nuevo perfil y genera sus credenciales de acceso.' },
  'client-search': { title: 'Consultar Clientes', eyebrow: 'Clientes / Consulta', subtitle: 'Busca perfiles registrados en la serviteca.' },
  'client-list': { title: 'Listado de Clientes', eyebrow: 'Clientes / Directorio', subtitle: 'Directorio de clientes registrados.' },
  'car-add': { title: 'Agregar Carro', eyebrow: 'Carros / Registro', subtitle: 'Vincula un vehículo a un cliente de la serviteca.' },
  'car-search': { title: 'Consultar Carros', eyebrow: 'Carros / Consulta', subtitle: 'Encuentra vehículos registrados por placa o modelo.' },
  'car-list': { title: 'Listado de Carros', eyebrow: 'Carros / Flota', subtitle: 'Vehículos registrados en la serviteca.' },
  'service-add': { title: 'Registrar Servicio', eyebrow: 'Servicios / Registro', subtitle: 'Registra una atención realizada a un vehículo afiliado.' },
  'service-search': { title: 'Consulta de Servicios', eyebrow: 'Servicios / Historial', subtitle: 'Consulta el historial de atención por placa del vehículo.' },
  'service-list': { title: 'Servicios Registrados', eyebrow: 'Servicios / Listado', subtitle: 'Historial de servicios prestados.' },
  help: { title: 'Centro de Ayuda', eyebrow: 'Soporte', subtitle: 'Encuentra orientación para gestionar clientes, vehículos y servicios.' },
}

function TextField({ id, label, placeholder, type = 'text', icon }: { id: string; label: string; placeholder: string; type?: string; icon?: IconName }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs font-medium text-slate-300">{label}</span>
      <span className="field-focus group flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-[#0B0F17]/90 px-3.5 transition focus-within:border-cyan-300/60 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]">
        {icon && <Icon name={icon} size={17} className="shrink-0 text-slate-500 group-focus-within:text-cyan-300" />}
        <input id={id} name={id} type={type} required placeholder={placeholder} className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />
      </span>
    </label>
  )
}

function SelectField({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs font-medium text-slate-300">{label}</span>
      <span className="relative block">
        <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-[#0B0F17] px-3.5 pr-10 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]">
          {children}
        </select>
        <Icon name="chevron" size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-500" />
      </span>
    </label>
  )
}

function FormPanel({ children, onSubmit, submitLabel, icon }: { children: React.ReactNode; onSubmit: (event: FormEvent<HTMLFormElement>) => void; submitLabel: string; icon: IconName }) {
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-700/70 bg-[#1E293B]/75 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-7">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-700/70 pb-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200"><Icon name={icon} size={19} /></div>
        <div><p className="text-sm font-semibold text-white">Información del registro</p><p className="mt-0.5 text-xs text-slate-500">Los campos marcados son obligatorios</p></div>
      </div>
      {children}
      <div className="mt-7 flex border-t border-slate-700/70 pt-5">
        <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 text-sm font-bold text-[#07120f] transition hover:-translate-y-0.5 hover:bg-[#22C55E] hover:shadow-[0_9px_28px_rgba(16,185,129,0.22)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Icon name="check" size={17} />{submitLabel}</button>
      </div>
    </form>
  )
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="w-full max-w-md rounded-3xl border border-emerald-300/35 bg-[#101a21]/95 p-6 shadow-[0_0_55px_rgba(16,185,129,0.16)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="success-title">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 text-emerald-300"><Icon name="check" size={24} /></div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Operación completada</p>
        <h3 id="success-title" className="mt-2 text-xl font-semibold text-white">Cliente Registrado con éxito.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">Credenciales generadas:</p>
        <div className="mt-5 space-y-2 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.06] p-4 font-mono text-sm">
          <p className="text-slate-200">Usuario: <span className="font-bold text-emerald-200">CarlosP234</span></p>
          <p className="text-slate-200">Contraseña: <span className="font-bold text-emerald-200">58291#Carlos</span></p>
        </div>
        <button type="button" onClick={onClose} className="mt-6 h-11 w-full rounded-xl border border-emerald-300/25 bg-emerald-400/[0.08] text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Entendido</button>
      </section>
    </div>
  )
}

function ClientForm({ onSave, onSaved }: { onSave: (record: Omit<ClientRecord, 'id'>) => void; onSaved?: () => void }) {
  const [idType, setIdType] = useState('CC')
  const [showSuccess, setShowSuccess] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSave({ idType, idNumber: String(data.get('id-number')), firstName: String(data.get('first-name')), lastName: String(data.get('last-name')), email: String(data.get('email')), phone: String(data.get('phone')) })
    setShowSuccess(true)
    event.currentTarget.reset()
    setIdType('CC')
    onSaved?.()
  }
  return <>
    <FormPanel onSubmit={submit} submitLabel="Guardar Cliente" icon="users">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="client-id-type" label="Tipo de ID" value={idType} onChange={setIdType}><option value="CC">Cédula de ciudadanía (CC)</option><option value="CE">Cédula de extranjería (CE)</option><option value="NIT">NIT</option><option value="Pasaporte">Pasaporte</option></SelectField>
        <TextField id="id-number" label="Número de Identificación" placeholder="Ej. 1020304050" icon="id" />
        <TextField id="first-name" label="Nombres" placeholder="Ingresa los nombres" icon="user" />
        <TextField id="last-name" label="Apellidos" placeholder="Ingresa los apellidos" icon="user" />
        <TextField id="email" label="Correo Electrónico" placeholder="nombre@correo.com" type="email" icon="mail" />
        <TextField id="phone" label="Número de Celular" placeholder="+57 300 000 0000" type="tel" icon="phone" />
      </div>
    </FormPanel>
    {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
  </>
}

function CarForm({ onSave }: { onSave: (record: Omit<CarRecord, 'id'>) => void }) {
  const [notice, setNotice] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSave({ plate: String(data.get('car-plate')).toUpperCase(), make: String(data.get('car-make')), model: String(data.get('car-model')) })
    event.currentTarget.reset()
    setNotice('Vehículo registrado correctamente.')
    window.setTimeout(() => setNotice(''), 3500)
  }
  return <>
    <FormPanel onSubmit={submit} submitLabel="Registrar Carro" icon="car">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="car-plate" label="Placa del Vehículo" placeholder="Ej. ABC123" icon="id" />
        <TextField id="car-make" label="Marca" placeholder="Ej. Toyota" icon="car" />
        <TextField id="car-model" label="Modelo" placeholder="Ej. Corolla 2022" icon="grid" />
      </div>
    </FormPanel>
    {notice && <p aria-live="polite" className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-100">{notice}</p>}
  </>
}

function ServiceForm({ onSave }: { onSave: (record: Omit<ServiceRecord, 'id'>) => void }) {
  const [serviceType, setServiceType] = useState('Cambio de Aceite')
  const [notice, setNotice] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const rawDate = String(data.get('service-date'))
    const [year, month, day] = rawDate.split('-')
    onSave({ plate: String(data.get('service-plate')).toUpperCase(), clientId: String(data.get('service-client-id')), date: `${day}/${month}/${year}`, service: serviceType })
    event.currentTarget.reset()
    setServiceType('Cambio de Aceite')
    setNotice('Servicio registrado correctamente.')
    window.setTimeout(() => setNotice(''), 3500)
  }
  return <>
    <FormPanel onSubmit={submit} submitLabel="Registrar Servicio" icon="wrench">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="service-plate" label="Placa del Carro" placeholder="Ej. ABC123" icon="car" />
        <TextField id="service-client-id" label="Identificación del Cliente" placeholder="Número de identificación" icon="id" />
        <TextField id="service-date" label="Fecha del Servicio" placeholder="Selecciona una fecha" type="date" icon="calendar" />
        <SelectField id="service-type" label="Tipo de Servicio" value={serviceType} onChange={setServiceType}><option>Cambio de Aceite</option><option>Sincronización</option><option>Alineación</option><option>Lavado</option></SelectField>
      </div>
    </FormPanel>
    {notice && <p aria-live="polite" className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-100">{notice}</p>}
  </>
}

function EmptyState({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/35 px-5 py-12 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-slate-700 bg-slate-800/70 text-slate-400"><Icon name={icon} size={22} /></div><h3 className="mt-4 text-sm font-semibold text-slate-200">{title}</h3><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">{text}</p></div>
}

function TablePanel({ headers, rows }: { headers: string[]; rows: string[][] }) {
  if (!rows.length) return <EmptyState icon="list" title="Aún no hay registros" text="Los registros que agregues aparecerán aquí." />
  return <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#1E293B]/60"><div className="overflow-x-auto"><table className="w-full min-w-[600px] border-collapse text-left"><thead><tr className="border-b border-slate-700/80 bg-slate-900/50">{headers.map((header) => <th key={header} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={`${row[0]}-${i}`} className="border-b border-slate-800/80 last:border-0 hover:bg-slate-800/25">{row.map((cell, j) => <td key={`${j}-${cell}`} className={`px-4 py-3.5 text-sm ${j === 0 ? 'font-mono font-semibold tracking-wide text-emerald-200' : 'text-slate-300'}`}>{cell}</td>)}</tr>)}</tbody></table></div></div>
}

function SearchPanel({ placeholder, value, onChange, children }: { placeholder: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <><div className="group mb-4 flex h-12 items-center gap-3 rounded-xl border border-slate-700 bg-[#111827] px-4 transition focus-within:border-cyan-300/60"><Icon name="search" className="text-slate-500 group-focus-within:text-cyan-300" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /></div>{children}</>
}

export function AdminDashboard({ onLogout, clients, cars, services, onClientSaved, onCarSaved, onServiceSaved }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('home')
  const [openGroup, setOpenGroup] = useState<MenuGroup['id'] | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const meta = sectionInfo[activeSection]
  const allServices = [...demoVehicleServices, ...services]

  function goTo(section: AdminSection) {
    setActiveSection(section)
    setQuery('')
    setMobileOpen(false)
    const group = menuGroups.find((item) => item.items.some((subitem) => subitem.section === section))
    if (group) setOpenGroup(group.id)
  }

  const filteredClients = useMemo(() => clients.filter((client) => `${client.firstName} ${client.lastName} ${client.idNumber}`.toLowerCase().includes(query.toLowerCase())), [clients, query])
  const filteredCars = useMemo(() => cars.filter((car) => `${car.plate} ${car.make} ${car.model}`.toLowerCase().includes(query.toLowerCase())), [cars, query])
  const dashboardStats: { label: string; value: number; icon: IconName; color: 'emerald' | 'cyan' | 'blue' }[] = activeSection === 'home'
    ? [
        { label: 'Clientes activos', value: 4, icon: 'users', color: 'emerald' },
        { label: 'Carros registrados', value: 4, icon: 'car', color: 'cyan' },
        { label: 'Servicios este mes', value: 7, icon: 'wrench', color: 'blue' },
      ]
    : [
        { label: 'Clientes', value: clients.length, icon: 'users', color: 'emerald' },
        { label: 'Vehículos', value: cars.length, icon: 'car', color: 'cyan' },
        { label: 'Servicios', value: allServices.length, icon: 'wrench', color: 'blue' },
      ]

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 lg:flex">
      {mobileOpen && <button type="button" className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden" aria-label="Cerrar menú de navegación" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[278px] flex-col border-r border-cyan-300/20 bg-[#111827] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[82px] items-center gap-3 border-b border-slate-700/70 px-5">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] text-emerald-300"><Icon name="wrench" size={22} /></div>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Panel de control</p><p className="mt-0.5 text-sm font-bold tracking-wide text-white">SERVITECA <span className="text-cyan-300">ADSO</span></p></div>
          <button type="button" className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-800 lg:hidden" aria-label="Cerrar menú" onClick={() => setMobileOpen(false)}><Icon name="close" size={17} /></button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5" aria-label="Menú de administración">
          <button type="button" onClick={() => goTo('home')} aria-current={activeSection === 'home' ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${activeSection === 'home' ? 'bg-emerald-400/[0.1] text-emerald-200' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}><Icon name="home" size={18} />Inicio</button>
          <div className="px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">Gestión</div>
          {menuGroups.map((group) => {
            const expanded = openGroup === group.id
            const selected = group.items.some((item) => item.section === activeSection)
            return <div key={group.id}>
              <button type="button" onClick={() => setOpenGroup(expanded ? null : group.id)} aria-expanded={expanded} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${selected ? 'text-white' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
                <Icon name={group.icon} size={18} className={selected ? 'text-emerald-300' : 'text-slate-500'} /><span className="flex-1">{group.label}</span><Icon name="chevron" size={15} className={`transition-transform ${expanded ? 'rotate-90 text-emerald-300' : 'text-slate-600'}`} />
              </button>
              {expanded && <div className="ml-5 mt-1 space-y-1 border-l border-cyan-300/15 pl-3">{group.items.map((item) => <button key={item.section} type="button" onClick={() => goTo(item.section)} aria-current={activeSection === item.section ? 'page' : undefined} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition ${activeSection === item.section ? 'bg-emerald-400/[0.1] font-semibold text-emerald-200 shadow-[inset_2px_0_0_#10B981]' : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-200'}`}><Icon name={item.icon} size={14} />{item.label}</button>)}</div>}
            </div>
          })}
          <div className="border-t border-slate-700/70 pt-4">
            <button type="button" onClick={() => goTo('help')} aria-current={activeSection === 'help' ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${activeSection === 'help' ? 'bg-emerald-400/[0.1] text-emerald-200' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}><Icon name="help" size={18} />Ayuda</button>
          </div>
        </nav>

        <div className="border-t border-slate-700/70 p-3">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-800/45 p-3"><div className="grid h-9 w-9 place-items-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-xs font-bold text-emerald-200">AD</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-200">Administrador</p><p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Cuenta activa</p></div></div>
          <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 transition hover:bg-rose-400/[0.07] hover:text-rose-200"><Icon name="logout" size={17} />Salir / Cerrar sesión</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-slate-800/80 bg-[#0B0F17]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><button type="button" onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-300 lg:hidden" aria-label="Abrir menú"><Icon name="menu" /></button><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Administración</p><p className="mt-0.5 text-xs font-medium text-slate-300">SERVITECA ADSO <span className="mx-1 text-slate-700">/</span><span className="text-cyan-200">{meta.eyebrow.split(' / ')[1] ?? meta.eyebrow}</span></p></div></div>
          <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-cyan-100">AD</div></div>
        </header>

        <main className="mx-auto w-full max-w-[1260px] px-4 pb-28 pt-6 sm:px-6 sm:pb-32 sm:pt-8 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{meta.eyebrow}</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{meta.title}</h1><p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-400">{meta.subtitle}</p></div><button type="button" onClick={() => goTo('service-search')} className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/[0.05] px-3.5 text-xs font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/[0.1]"><Icon name="search" size={15} />Consulta por placa</button></div>

          <div className="mb-6 grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {dashboardStats.map((stat) => <SummaryCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />)}
          </div>

          <div className="space-y-5">
            {activeSection === 'home' && <AdminHome onNavigate={goTo} />}
            {activeSection === 'client-add' && <ClientForm onSave={onClientSaved} />}
            {activeSection === 'car-add' && <CarForm onSave={onCarSaved} />}
            {activeSection === 'service-add' && <ServiceForm onSave={onServiceSaved} />}
            {activeSection === 'service-search' && <ServiceLookup records={allServices} />}
            {activeSection === 'client-list' && <TablePanel headers={['Identificación', 'Cliente', 'Correo', 'Celular']} rows={clients.map((item) => [`${item.idType} ${item.idNumber}`, `${item.firstName} ${item.lastName}`, item.email, item.phone])} />}
            {activeSection === 'car-list' && <TablePanel headers={['ID', 'Placa', 'Marca', 'Modelo']} rows={cars.map((item) => [item.id, item.plate, item.make, item.model])} />}
            {activeSection === 'service-list' && <TablePanel headers={['Placa', 'Servicio', 'Fecha']} rows={allServices.map((item) => [item.plate, item.service, item.date])} />}
            {activeSection === 'client-search' && <SearchPanel placeholder="Buscar por nombre o número de identificación" value={query} onChange={setQuery}><TablePanel headers={['Identificación', 'Cliente', 'Correo', 'Celular']} rows={filteredClients.map((item) => [`${item.idType} ${item.idNumber}`, `${item.firstName} ${item.lastName}`, item.email, item.phone])} /></SearchPanel>}
            {activeSection === 'car-search' && <SearchPanel placeholder="Buscar por placa, marca o modelo" value={query} onChange={setQuery}><TablePanel headers={['ID', 'Placa', 'Marca', 'Modelo']} rows={filteredCars.map((item) => [item.id, item.plate, item.make, item.model])} /></SearchPanel>}
            {activeSection === 'help' && <HelpPanel />}
          </div>
        </main>
      </div>
      <nav className="fixed bottom-3 left-3 right-3 z-20 mx-auto grid max-w-[366px] grid-cols-5 gap-1 rounded-2xl border border-slate-700/80 bg-[#111827]/95 p-2 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl" aria-label="Navegación principal">
        {adminBottomItems.map((item) => {
          const selected = item.activeSections.includes(activeSection)
          return <button key={item.label} type="button" aria-current={selected ? 'page' : undefined} onClick={() => goTo(item.section)} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-medium transition ${selected ? 'bg-cyan-400/[0.1] text-cyan-100' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}><Icon name={item.icon} size={17} />{item.label}</button>
        })}
      </nav>
    </div>
  )
}

function SummaryCard({ label, value, icon, color }: { label: string; value: number; icon: IconName; color: 'emerald' | 'cyan' | 'blue' }) {
  const tones = { emerald: 'text-emerald-300 border-emerald-300/15 bg-emerald-400/[0.06]', cyan: 'text-cyan-200 border-cyan-300/15 bg-cyan-400/[0.06]', blue: 'text-blue-200 border-blue-300/15 bg-blue-400/[0.06]' }
  return <div className="rounded-2xl border border-cyan-300/15 bg-[#1E293B]/75 p-3.5 shadow-[0_0_20px_rgba(34,211,238,0.035)] sm:flex sm:items-center sm:gap-3.5 sm:p-4"><div className={`mb-2 grid h-8 w-8 place-items-center rounded-lg border sm:mb-0 ${tones[color]}`}><Icon name={icon} size={16} /></div><div><p className="text-[10px] leading-4 text-slate-400 sm:text-xs">{label}</p><p className="mt-0.5 text-lg font-semibold text-emerald-300 sm:text-xl">{String(value).padStart(2, '0')}</p></div></div>
}

function AdminHome({ onNavigate }: { onNavigate: (section: AdminSection) => void }) {
  const shortcuts: { title: string; detail: string; section: AdminSection; icon: IconName }[] = [
    { title: 'Clientes', detail: 'Perfiles y afiliaciones', section: 'client-add', icon: 'users' },
    { title: 'Carros', detail: 'Vehículos registrados', section: 'car-add', icon: 'car' },
    { title: 'Servicios', detail: 'Atenciones e historial', section: 'service-add', icon: 'wrench' },
    { title: 'Ayuda', detail: 'Guía de gestión', section: 'help', icon: 'help' },
  ]

  return (
    <section aria-labelledby="admin-shortcuts-title">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Acceso rápido</p><h2 id="admin-shortcuts-title" className="mt-1 text-lg font-semibold text-white">¿Qué deseas gestionar?</h2></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((item) => <button key={item.title} type="button" onClick={() => onNavigate(item.section)} className="group flex min-h-[118px] flex-col items-start justify-between rounded-2xl border border-cyan-300/15 bg-[#1E293B]/75 p-4 text-left shadow-[0_10px_28px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-[#1E293B] hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <div className="flex w-full items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200"><Icon name={item.icon} size={18} /></span><Icon name="arrow" size={16} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-300" /></div>
          <span><span className="block text-sm font-semibold text-white">{item.title}</span><span className="mt-1 block text-[10px] leading-4 text-slate-400">{item.detail}</span></span>
        </button>)}
      </div>
    </section>
  )
}

function HelpPanel() {
  return <div className="grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-slate-700/70 bg-[#1E293B]/65 p-5 sm:p-6"><div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200"><Icon name="help" /></div><h3 className="mt-4 text-base font-semibold text-white">Navegación de administración</h3><p className="mt-2 text-sm leading-6 text-slate-400">Usa los grupos Clientes, Carros y Servicios para abrir formularios, consultas y listados.</p></article><article className="rounded-2xl border border-slate-700/70 bg-[#1E293B]/65 p-5 sm:p-6"><div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] text-emerald-200"><Icon name="shield" /></div><h3 className="mt-4 text-base font-semibold text-white">Gestión de registros</h3><p className="mt-2 text-sm leading-6 text-slate-400">Registra clientes, vincula vehículos y consulta los servicios prestados por placa.</p></article></div>
}
