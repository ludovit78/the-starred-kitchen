import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/categories'

type Props = {
  active?: string
  includeAll?: boolean
  basePath?: 'link' | 'button'
  onSelect?: (id: string) => void
}

export function CategoryChips({ active, includeAll = true, basePath = 'link', onSelect }: Props) {
  const items = includeAll
    ? [{ id: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))]
    : CATEGORIES.map((c) => ({ id: c.id, label: c.label }))

  const chip = (id: string, label: string) => {
    const isActive = (active ?? 'all') === id
    const className = `whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      isActive
        ? 'bg-terracotta-600 text-cream-50 shadow-sm'
        : 'bg-sage-100 text-sage-800 hover:bg-sage-200'
    }`
    if (basePath === 'button' && onSelect) {
      return (
        <button key={id} type="button" className={className} onClick={() => onSelect(id)}>
          {label}
        </button>
      )
    }
    const to = id === 'all' ? '/recipes' : `/category/${id}`
    return (
      <Link key={id} to={to} className={className}>
        {label}
      </Link>
    )
  }

  return <div className="flex flex-wrap gap-2">{items.map((i) => chip(i.id, i.label))}</div>
}
