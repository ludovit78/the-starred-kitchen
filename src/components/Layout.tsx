import { Link, NavLink, Outlet } from 'react-router-dom'
import { PAYPAL_ME_URL } from '../lib/paypal'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-full text-sm font-medium transition ${
    isActive
      ? 'bg-sage-800 text-cream-50'
      : 'text-sage-800/80 hover:bg-sage-100 hover:text-sage-900'
  }`

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-sage-200/70 bg-cream-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-800 text-terracotta-300 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M12 2.5l2.4 7.3H22l-6 4.4 2.3 7.3L12 17.1l-6.3 4.4 2.3-7.3-6-4.4h7.6L12 2.5z" />
              </svg>
            </span>
            <div>
              <div className="font-display text-lg leading-tight text-sage-900 group-hover:text-terracotta-700 transition">
                The Starred Kitchen
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-sage-600/80">
                Cookbook
              </div>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/recipes" className={linkClass}>
              All recipes
            </NavLink>
            <NavLink to="/favorites" className={linkClass}>
              Favorites
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-sage-200/80 bg-sage-900 text-cream-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-lg">The Starred Kitchen</p>
            <p className="mt-1 text-sm text-cream-100/70">
              Nutrition values are estimates per serving
            </p>
          </div>
          <a
            href={PAYPAL_ME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-md transition hover:bg-terracotta-400"
          >
            Buy with PayPal
          </a>
        </div>
      </footer>
    </div>
  )
}
