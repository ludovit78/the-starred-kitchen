import type { FilterState } from '../types/recipe'
import { CategoryChips } from './CategoryChips'

type Props = {
  filters: FilterState
  onChange: (next: FilterState) => void
  resultCount?: number
}

export function SearchFilters({ filters, onChange, resultCount }: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-sage-200/80 bg-cream-100/70 p-4 sm:p-5">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search titles, ingredients, or sources…"
          className="w-full rounded-xl border border-sage-200 bg-cream-50 py-2.5 pl-10 pr-3 text-sage-900 placeholder:text-sage-400 focus:border-terracotta-400 focus:outline-none focus:ring-2 focus:ring-terracotta-200"
        />
      </div>

      <CategoryChips
        active={filters.category}
        basePath="button"
        onSelect={(id) => onChange({ ...filters, category: id })}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Toggle
          label="Starred"
          checked={filters.starredOnly}
          onChange={(v) => onChange({ ...filters, starredOnly: v })}
        />
        <Toggle
          label="Full recipe"
          checked={filters.fullRecipeOnly}
          onChange={(v) => onChange({ ...filters, fullRecipeOnly: v })}
        />
        <Toggle
          label="Has nutrition"
          checked={filters.nutritionOnly}
          onChange={(v) => onChange({ ...filters, nutritionOnly: v })}
        />
        {typeof resultCount === 'number' && (
          <span className="ml-auto text-sm text-sage-600">{resultCount} recipes</span>
        )}
      </div>
    </div>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-sage-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-sage-300 text-terracotta-600 focus:ring-terracotta-300"
      />
      {label}
    </label>
  )
}
