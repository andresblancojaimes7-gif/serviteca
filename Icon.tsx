import type { ReactNode } from 'react'

export type IconName =
  | 'wrench' | 'user' | 'users' | 'lock' | 'eye' | 'eyeOff' | 'arrow'
  | 'grid' | 'home' | 'car' | 'plus' | 'search' | 'list' | 'help' | 'logout'
  | 'menu' | 'chevron' | 'check' | 'calendar' | 'shield' | 'close'
  | 'clock' | 'sparkles' | 'filter' | 'mail' | 'phone' | 'id'

const drawings: Record<IconName, ReactNode> = {
  wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3.2 17.8a2.1 2.1 0 0 0 3 3l5.1-5.1a5 5 0 0 0 6.4-6.4l-3.1 3.1-3.1-3.1 3.2-3Z" /><path d="m17.5 6.5 1.9-1.9" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
  users: <><path d="M16 20a6 6 0 0 0-12 0" /><circle cx="10" cy="8" r="3.5" /><path d="M18 8.5a3.3 3.3 0 0 1 0 6.4M20 20a5 5 0 0 0-3.5-4.8" /></>,
  lock: <><rect x="4.5" y="10" width="15" height="11" rx="2.2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14.5v2" /></>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.7" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.7 4.4 9.5 6-.3.7-1.3 2-2.8 3.3M6.2 6.3C4.1 7.7 2.9 9.7 2.5 11c.8 1.6 4.3 6 9.5 6 1.2 0 2.3-.2 3.3-.6" /></>,
  arrow: <><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.4" /></>,
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  car: <><path d="m5 11 1.4-4a2 2 0 0 1 1.9-1.4h7.4a2 2 0 0 1 1.9 1.4L19 11" /><path d="M3.5 12.5A1.5 1.5 0 0 1 5 11h14a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 19 18h-1v2h-2v-2H8v2H6v-2H5a1.5 1.5 0 0 1-1.5-1.5v-4Z" /><path d="M6.5 14.5h.01M17.5 14.5h.01" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></>,
  list: <><path d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.4 1.6c-.8.9-2 1.2-2 2.9M12 17h.01" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17" /></>,
  shield: <><path d="M12 3 19 6v5c0 4.5-3 7.8-7 10-4-2.2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sparkles: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.6 1.9L21.5 18.5l-1.9.6L19 21l-.6-1.9-1.9-.6 1.9-.6L19 16Z" /></>,
  filter: <><path d="M4 6h16M7 12h10m-7 6h4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <><path d="M6.5 3.5h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10 19.5 4.5 14 4.5 7.5c0-1.1.9-2 2-2Z" /></>,
  id: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M5.5 16a3 3 0 0 1 5 0M13 10h5M13 14h5" /></>,
}

export function Icon({ name, size = 18, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[name]}
    </svg>
  )
}
