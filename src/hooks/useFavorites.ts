import { useCallback, useEffect, useState } from 'react'

const KEY = 'starred-kitchen-favorites'

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    typeof window === 'undefined' ? [] : read(),
  )

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavorites(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next: string[]) => {
    setFavorites(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback(
    (id: string) => {
      persist(favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id])
    },
    [favorites, persist],
  )

  return { favorites, isFavorite, toggleFavorite }
}
