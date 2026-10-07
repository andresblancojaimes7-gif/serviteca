import { useState, type FormEvent } from 'react'
import type { AppRole } from '../types'
import { Icon } from './Icon'

type LoginPageProps = { onEnter: (role: AppRole) => void }

export function LoginPage({ onEnter }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRolePicker, setShowRolePicker] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isLoading) return
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setShowRolePicker(true)
    }, 500)
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F17] px-5 py-8 text-slate-100 sm:px-8">
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-green" aria-hidden="true" />
      <div className="technical-grid" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-[430px] flex-col items-center">
        <header className="mb-7 flex w-full items-center gap-3.5 sm:mb-8">
          <div className="brand-mark grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-slate-900/80 text-emerald-300 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <Icon name="wrench" size={24} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/75">Control de servicio</p>
            <p className="mt-0.5 text-sm font-medium tracking-wide text-slate-300">Portal de acceso</p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-200/80">Sistema</span>
          </div>
        </header>

        <section className="login-card w-full rounded-[28px] border border-slate-700/70 bg-slate-900/75 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-9" aria-labelledby="login-heading">
          <div className="mb-8 flex items-center">
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(103,232,249,0.8)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100/80">Acceso seguro</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-[18px] border border-emerald-300/20 bg-gradient-to-br from-emerald-400/15 to-cyan-400/10 text-emerald-300 shadow-[0_0_28px_rgba(16,185,129,0.08)]">
              <Icon name="wrench" size={28} />
            </div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300">SERVITECA</p>
            <h1 id="login-heading" className="text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">ADSO<span className="text-cyan-300">.</span></h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">Bienvenido al Sistema de Gestión</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="mb-2 block text-xs font-medium tracking-wide text-slate-300">Usuario</label>
              <div className="input-shell group flex h-[52px] items-center gap-3 rounded-xl border border-slate-700/80 bg-[#0c121d]/90 px-4 transition-all duration-200 focus-within:border-cyan-300/60 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.08),0_0_22px_rgba(34,211,238,0.08)]">
                <Icon name="user" className="shrink-0 text-slate-500 transition-colors group-focus-within:text-cyan-300" />
                <input id="username" name="username" type="text" autoComplete="username" required placeholder="Ingresa tu usuario" className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-medium tracking-wide text-slate-300">Contraseña</label>
              <div className="input-shell group flex h-[52px] items-center gap-3 rounded-xl border border-slate-700/80 bg-[#0c121d]/90 px-4 transition-all duration-200 focus-within:border-cyan-300/60 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.08),0_0_22px_rgba(34,211,238,0.08)]">
                <Icon name="lock" className="shrink-0 text-slate-500 transition-colors group-focus-within:text-cyan-300" />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Ingresa tu contraseña" className="h-full w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-700/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}>
                  <Icon name={showPassword ? 'eyeOff' : 'eye'} />
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="login-button group mt-2 flex h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#10B981] px-5 text-sm font-bold tracking-wide text-[#07120f] shadow-[0_8px_28px_rgba(16,185,129,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#22C55E] hover:shadow-[0_10px_34px_rgba(16,185,129,0.28),0_0_24px_rgba(16,185,129,0.12)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-wait disabled:opacity-75">
              {isLoading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#07120f]/25 border-t-[#07120f]" /> Verificando acceso…</> : <>Iniciar Sesión <Icon name="arrow" className="transition-transform duration-200 group-hover:translate-x-1" /></>}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
            <Icon name="lock" size={14} className="mt-0.5 shrink-0 text-emerald-300/70" />
            <p>Acceso exclusivo para Administradores y Clientes afiliados</p>
          </div>
        </section>

        <footer className="mt-6 text-center text-[11px] text-slate-600"><span className="text-slate-500">Precisión en cada servicio.</span><span className="mx-2 text-slate-700">/</span><span>Experiencia de acceso</span></footer>
      </div>

      {showRolePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowRolePicker(false) }}>
          <section className="w-full max-w-md rounded-3xl border border-cyan-300/20 bg-[#111827] p-6 shadow-[0_0_50px_rgba(6,182,212,0.12)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="role-title">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300"><Icon name="sparkles" size={23} /></div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Acceso</p>
            <h2 id="role-title" className="mt-2 text-xl font-semibold text-white">¿Cómo deseas ingresar?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Selecciona el perfil asociado a tu cuenta.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => onEnter('admin')} className="flex min-h-14 items-center justify-between rounded-xl border border-emerald-300/20 bg-emerald-400/[0.07] px-4 text-left text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><span className="flex items-center gap-2"><Icon name="grid" />Administrador</span><Icon name="arrow" size={16} /></button>
              <button type="button" onClick={() => onEnter('client')} className="flex min-h-14 items-center justify-between rounded-xl border border-cyan-300/20 bg-cyan-400/[0.06] px-4 text-left text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-400/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><span className="flex items-center gap-2"><Icon name="user" />Cliente</span><Icon name="arrow" size={16} /></button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
