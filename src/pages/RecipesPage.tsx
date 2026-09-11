import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState, LoadingState } from '../components/LoadingState'
import { RecipeCard } from '../components/RecipeCard'
import { SearchFilters } from '../components/SearchFilters'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipes } from '../hooks/useRecipes'
import { matchesFilters, sortRecipes } from '../lib/search'
import type { FilterState } from '../types/recipe'

export function RecipesPage() {
  const { recipes, loading, error } = useRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [params] = useSearchParams()

  const [filters, setFilters] = useState<FilterState>({
    query: params.get('q') ?? '',
    category: params.get('category') ?? 'all',
    starredOnly: params.get('starred') === '1',
    fullRecipeOnly: params.get('full') === '1',
    nutritionOnly: params.get('nutrition') === '1',
  })

  const filtered = useMemo(
    () => sortRecipes(recipes.filter((r) => matchesFilters(r, filters))),
    [recipes, filters],
  )

  if (loading) return <LoadingState />
  if (error) return <LoadingState label={error} />

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="font-display text-4xl text-sage-900">All recipes</h1>
        <p className="mt-2 text-sage-600">
          Search and filter the full catalog. Full recipes with ingredients appear first.
        </p>
      </div>
      <SearchFilters filters={filters} onChange={setFilters} resultCount={filtered.length} />
      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState title="No recipes match" body="Try clearing filters or searching a different term." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favorite={isFavorite(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
