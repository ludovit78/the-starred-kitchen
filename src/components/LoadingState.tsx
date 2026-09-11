export function LoadingState({ label = 'Loading recipes…' }: { label?: string }) {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24 text-sage-600">
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-sage-300 border-t-terracotta-600" />
        <span>{label}</span>
      </div>
    </div>
  )
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-sage-300 bg-cream-100/50 px-6 py-12 text-center">
      <h3 className="font-display text-2xl text-sage-800">{title}</h3>
      {body && <p className="mt-2 text-sage-600">{body}</p>}
    </div>
  )
}
