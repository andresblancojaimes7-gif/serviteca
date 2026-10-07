import { useMemo, useState, type FormEvent } from 'react'
import { demoVehicleServices, type ServiceRecord } from '../types'
import { Icon, type IconName } from './Icon'

const filters = ['Todos', 'Cambio de Aceite', 'Sincronización', 'Alineación', 'Lavado'] as const

type ServiceLookupProps = { records?: ServiceRecord[]; compact?: boolean }

function normalizePlate(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

function serviceIcon(service: string): IconName {
  if (/lavado/i.test(service)) return 'sparkles'
  if (/aceite/i.test(service)) return 'clock'
  if (/alineaci/i.test(service)) return 'car'
  return 'wrench'
}

export function ServiceLookup({ records = demoVehicleServices, compact = false }: ServiceLookupProps) {
  const [plateInput, setPlateInput] = useState('')
  const [submittedPlate, setSubmittedPlate] = useState('')
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('Todos')

  const visibleRecords = useMemo(() => records.filter((record) => {
    const matchesPlate = !submittedPlate || normalizePlate(record.plate).includes(normalizePlate(submittedPlate))
    const matchesCategory = activeFilter === 'Todos' || record.service.toLocaleLowerCase('es').includes(activeFilter.toLocaleLowerCase('es'))
    return matchesPlate && matchesCategory
  }), [records, submittedPlate, activeFilter])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedPlate(plateInput.trim())
  }

  return (
    <section className="space-y-5" aria-labelledby="service-lookup-title">
      {!compact && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Historial vehicular</p>
          <h2 id="service-lookup-title" className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">Consulta de Servicios Prestados por Vehículo</h2>
          <p className="mt-1 text-sm text-slate-400">Busca la placa para consultar los servicios asociados.</p>
        </div>
      )}

      <form onSubmit={handleSearch} className="rounded-2xl border border-slate-700/70 bg-[#111827]/85 p-3 shadow-[0_14px_50px_rgba(0,0,0,0.16)] sm:flex sm:items-center sm:gap-3 sm:p-4">
        <label className="sr-only" htmlFor="plate-search">Ingrese la Placa del Carro (Ej: ABC123)</label>
        <div className="group flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-[#0B0F17] px-4 transition focus-within:border-cyan-300/70 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.08)]">
          <Icon name="search" className="shrink-0 text-slate-500 transition-colors group-focus-within:text-cyan-300" />
          <input id="plate-search" value={plateInput} onChange={(event) => setPlateInput(event.target.value)} placeholder="Ingrese la Placa del Carro (Ej: ABC123)" className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />
        </div>
        <button type="submit" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 text-sm font-bold text-[#07120f] transition hover:bg-[#22C55E] hover:shadow-[0_0_22px_rgba(16,185,129,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:mt-0 sm:w-auto">
          <Icon name="search" size={16} />Buscar
        </button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400"><Icon name="filter" size={16} className="text-cyan-300" />Filtros rápidos</div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por categoría">
          {filters.map((filter) => {
            const selected = activeFilter === filter
            return <button key={filter} type="button" aria-pressed={selected} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${selected ? 'border-cyan-300/45 bg-cyan-400/15 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.09)]' : 'border-slate-700/80 bg-slate-900/60 text-slate-400 hover:border-cyan-300/30 hover:text-slate-200'}`}>{filter}</button>
          })}
        </div>
      </div>

      <div className="space-y-3" aria-live="polite">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Servicios encontrados</h3>
          <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-[10px] font-medium text-slate-400">{visibleRecords.length} {visibleRecords.length === 1 ? 'SERVICIO' : 'SERVICIOS'}</span>
        </div>
        {visibleRecords.length ? visibleRecords.map((record) => (
          <article key={record.id} className="group rounded-2xl border border-slate-700/70 bg-[#111827]/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:shadow-[0_12px_32px_rgba(6,182,212,0.06)] sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200"><Icon name={serviceIcon(record.service)} size={20} /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="rounded-md border border-emerald-300/20 bg-emerald-400/[0.08] px-2 py-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-emerald-200">{record.plate}</span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-cyan-100 sm:text-[15px]">{record.service}</h4>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><Icon name="calendar" size={14} className="text-slate-500" />Fecha del servicio: <time>{record.date}</time></div>
              </div>
              <span className="mt-1 hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)] sm:block" aria-label="Registro activo" />
            </div>
          </article>
        )) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-5 py-10 text-center">
            <Icon name="search" size={24} className="mx-auto text-slate-600" />
            <p className="mt-3 text-sm font-medium text-slate-300">No encontramos servicios con esos filtros</p>
            <p className="mt-1 text-xs text-slate-500">Prueba otra placa o selecciona “Todos”.</p>
          </div>
        )}
      </div>
    </section>
  )
}
