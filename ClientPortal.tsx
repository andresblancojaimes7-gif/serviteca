import { useState } from 'react'
import { demoClientServices } from '../types'
import { Icon, type IconName } from './Icon'

type ClientPane = 'home' | 'cars' | 'services' | 'help'
type ClientPortalProps = { onLogout: () => void }

const navItems: { id: ClientPane; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'cars', label: 'Autos', icon: 'car' },
  { id: 'services', label: 'Historial', icon: 'list' },
  { id: 'help', label: 'Ayuda', icon: 'help' },
]

export function ClientPortal({ onLogout }: ClientPortalProps) {
  const [activePane, setActivePane] = useState<ClientPane>('home')
  const latestService = demoClientServices[0]
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F17] text-slate-100">
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-green" aria-hidden="true" />
      <div className="technical-grid" aria-hidden="true" />

      <header className="relative z-10 border-b border-slate-800/80 bg-[#0B0F17]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center gap-3.5">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] text-emerald-300"><Icon name="wrench" size={22} /></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">SERVITECA ADSO</p><h1 className="mt-1 text-base font-semibold text-white">Hola, Juan Pérez <span className="font-normal text-slate-500">| Cliente</span></h1></div>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-300/15 bg-emerald-400/[0.06] px-3 py-1.5 sm:self-auto"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" /><span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-200">Conexión activa</span></div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1180px] px-4 pb-28 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
        {activePane === 'home' && <section aria-labelledby="client-home-title">
          <div className="mb-5"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Resumen de tu cuenta</p><h2 id="client-home-title" className="mt-2 text-xl font-semibold tracking-tight text-white">BIENVENIDO, JUAN</h2><p className="mt-1 text-sm text-slate-400">Aquí tienes un resumen de tus vehículos y servicios.</p></div>

          <div className="grid grid-cols-2 gap-3">
            <article className="rounded-2xl border border-cyan-300/15 bg-[#1E293B]/75 p-4 shadow-[0_0_20px_rgba(34,211,238,0.035)]"><div className="flex items-center justify-between"><span className="text-[10px] font-medium text-slate-400">Autos registrados</span><Icon name="car" size={17} className="text-cyan-200" /></div><p className="mt-2 text-2xl font-semibold text-emerald-300">1</p></article>
            <article className="rounded-2xl border border-cyan-300/15 bg-[#1E293B]/75 p-4 shadow-[0_0_20px_rgba(34,211,238,0.035)]"><div className="flex items-center justify-between"><span className="text-[10px] font-medium text-slate-400">Servicios recibidos</span><Icon name="wrench" size={17} className="text-cyan-200" /></div><p className="mt-2 text-2xl font-semibold text-emerald-300">{demoClientServices.length}</p></article>
          </div>

          <div className="mt-5 flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Mi auto principal</h3><button type="button" onClick={() => setActivePane('cars')} className="text-xs font-medium text-cyan-200 transition hover:text-emerald-200">Ver autos</button></div>
          <article className="mt-3 rounded-2xl border border-cyan-300/20 bg-[#111827]/85 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/[0.08] text-cyan-200"><Icon name="car" size={22} /></span><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Vehículo personal</p><h4 className="mt-1 truncate text-sm font-semibold text-white">Toyota Corolla</h4><p className="mt-1 text-xs text-slate-400">Modelo 2022 · AUT-001</p></div></div><span className="shrink-0 rounded-lg border border-emerald-300/25 bg-emerald-400/[0.09] px-2.5 py-2 font-mono text-xs font-bold tracking-[0.12em] text-emerald-200">XYZ789</span></div>
          </article>

          <div className="mt-5 flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Último servicio</h3><Icon name="clock" size={16} className="text-cyan-300" /></div>
          {latestService && <article className="mt-3 rounded-2xl border border-slate-700/70 bg-[#1E293B]/65 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-cyan-100">{latestService.service}</p><p className="mt-1 text-xs text-slate-400">{latestService.vehicle}</p></div><time className="shrink-0 text-[10px] text-slate-500">{latestService.date}</time></div><button type="button" onClick={() => setActivePane('services')} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.06] px-3 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/[0.12]">Ver historial<Icon name="arrow" size={15} /></button></article>}
        </section>}

        {activePane === 'cars' && <section aria-labelledby="client-cars-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Mi cuenta</p><h2 id="client-cars-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">Mis Autos Registrados</h2><p className="mt-1 text-sm text-slate-400">Vehículos vinculados a tu perfil.</p></div><span className="rounded-full border border-slate-700 bg-slate-900/65 px-3 py-1.5 text-[10px] font-medium text-slate-400">1 vehículo</span></div>
          <article className="group relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#111827]/85 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.2)] transition hover:border-cyan-300/35 sm:p-7">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.08] text-cyan-200"><Icon name="car" size={27} /></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Vehículo personal</p><h3 className="mt-1 text-lg font-semibold text-white">Toyota <span className="text-slate-300">Corolla</span></h3><p className="mt-1 text-sm text-slate-400">Modelo 2022</p></div></div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-[310px]">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06] p-3.5"><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">Placa</p><p className="mt-1.5 font-mono text-base font-bold tracking-[0.16em] text-emerald-200">XYZ789</p></div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3.5"><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">ID Registro</p><p className="mt-1.5 font-mono text-sm font-semibold tracking-wide text-slate-200">AUT-001</p></div>
              </div>
            </div>
            <div className="relative mt-6 flex items-center gap-2 border-t border-slate-700/60 pt-4 text-[11px] text-slate-500"><Icon name="shield" size={14} className="text-emerald-300/70" />Vehículo verificado en tu perfil de cliente</div>
          </article>
        </section>}

        {activePane === 'services' && <section aria-labelledby="client-history-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Actividad</p><h2 id="client-history-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">Historial de Servicios Recibidos</h2><p className="mt-1 text-sm text-slate-400">Servicios asociados a tus autos registrados.</p></div><span className="rounded-full border border-slate-700 bg-slate-900/65 px-3 py-1.5 text-[10px] font-medium text-slate-400">{demoClientServices.length} servicios</span></div>
          <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111827]/80">
            <div className="hidden grid-cols-[160px_1fr_1fr] gap-4 border-b border-slate-700/70 bg-slate-900/60 px-5 py-3 sm:grid"><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Fecha</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Tipo de Servicio</span><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Auto Asociado</span></div>
            <div className="divide-y divide-slate-800/80">{demoClientServices.map((record) => <article key={record.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[160px_1fr_1fr] sm:items-center sm:gap-4 sm:px-5"><div className="flex items-center gap-2 text-xs text-slate-400"><Icon name="calendar" size={14} className="text-slate-500" /><span className="sm:hidden text-[9px] uppercase tracking-wider text-slate-600">Fecha</span><time>{record.date}</time></div><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-400/[0.06] text-cyan-200"><Icon name="wrench" size={15} /></span><span className="text-sm font-medium text-cyan-100">{record.service}</span></div><div className="flex items-center gap-2 pl-10 text-xs text-slate-400 sm:pl-0"><Icon name="car" size={14} className="text-slate-500" />{record.vehicle}</div></article>)}</div>
          </div>
        </section>}

        {activePane === 'help' && <section className="max-w-3xl rounded-3xl border border-slate-700/70 bg-[#111827]/80 p-5 sm:p-7"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200"><Icon name="help" size={22} /></div><p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Ayuda al cliente</p><h2 className="mt-2 text-xl font-semibold text-white">¿Necesitas asistencia?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Desde este portal puedes consultar tus vehículos registrados y revisar el historial de servicios recibidos. Si necesitas corregir un dato, comunícate con el equipo de administración de la serviteca.</p><div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/55 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-300/15 bg-emerald-400/[0.06] text-emerald-200"><Icon name="shield" /></span><div><p className="text-xs font-semibold text-slate-200">Tu perfil es de solo consulta</p><p className="mt-1 text-[11px] text-slate-500">Los cambios de datos los gestiona el administrador.</p></div></div></section>}

      </main>

      <nav className="fixed bottom-3 left-3 right-3 z-40 mx-auto grid max-w-[366px] grid-cols-5 gap-1 rounded-2xl border border-slate-700/80 bg-[#111827]/95 p-2 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl" aria-label="Navegación del cliente">
        {navItems.map((item) => <button key={item.id} type="button" aria-current={activePane === item.id ? 'page' : undefined} onClick={() => setActivePane(item.id)} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition ${activePane === item.id ? 'bg-cyan-400/[0.1] text-cyan-100' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}><Icon name={item.icon} size={18} />{item.label}</button>)}
        <button type="button" onClick={onLogout} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium text-slate-400 transition hover:bg-rose-400/[0.08] hover:text-rose-200"><Icon name="logout" size={18} />Salir</button>
      </nav>
    </div>
  )
}
