type Props = {
  active: boolean
  onClick: () => void
  size?: 'sm' | 'md'
  label?: string
}

export function StarButton({ active, onClick, size = 'md', label }: Props) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
      aria-pressed={active}
      aria-label={label ?? (active ? 'Remove from favorites' : 'Add to favorites')}
      className={`${dim} inline-flex items-center justify-center rounded-full border transition shadow-sm ${
        active
          ? 'border-terracotta-400 bg-terracotta-100 text-terracotta-700'
          : 'border-sage-200 bg-cream-50/90 text-sage-500 hover:border-terracotta-300 hover:text-terracotta-600'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3.5l2.6 6.2 6.7.5-5.1 4.4 1.5 6.5L12 17.8 6.3 21.1l1.5-6.5-5.1-4.4 6.7-.5L12 3.5z"
        />
      </svg>
    </button>
  )
}
