import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'
import type { Recipe } from '../types/recipe'

let cache: Recipe[] | null = null
let inflight: Promise<Recipe[]> | null = null

async function loadRecipes(): Promise<Recipe[]> {
  if (cache) return cache
  if (!inflight) {
    inflight = fetch(asset('data/recipes.json'))
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load recipes')
        return r.json()
      })
      .then((data: Recipe[]) => {
        cache = data
        return data
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    loadRecipes()
      .then((data) => {
        if (!cancelled) {
          setRecipes(data)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { recipes, loading, error }
}

export function useRecipe(id: string | undefined) {
  const { recipes, loading, error } = useRecipes()
  const recipe = id ? recipes.find((r) => r.id === id) : undefined
  return { recipe, loading, error }
}
