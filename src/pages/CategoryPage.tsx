import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState, LoadingState } from '../components/LoadingState'
import { RecipeCard } from '../components/RecipeCard'
import { SearchFilters } from '../components/SearchFilters'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipes } from '../hooks/useRecipes'
import { categoryImage, categoryLabel } from '../lib/categories'
import { matchesFilters, sortRecipes } from '../lib/search'
import type { FilterState } from '../types/recipe'

export function CategoryPage() {
  const { categoryId = '' } = useParams()
  const { recipes, loading, error } = useRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: categoryId || 'all',
    starredOnly: false,
    fullRecipeOnly: false,
    nutritionOnly: false,
  })

  // Keep category locked to route
  const effective: FilterState = { ...filters, category: categoryId || 'all' }

  const filtered = useMemo(
    () => sortRecipes(recipes.filter((r) => matchesFilters(r, effective))),
    [recipes, effective.query, effective.starredOnly, effective.fullRecipeOnly, effective.nutritionOnly, categoryId],
  )

  if (loading) return <LoadingState />
  if (error) return <LoadingState label={error} />

  const label = categoryLabel(categoryId)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-sage-200">
        <img src={categoryImage(categoryId)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-sage-950/65" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Link to="/recipes" className="text-sm text-cream-100/80 hover:text-cream-50">
            ← All recipes
          </Link>
          <h1 className="mt-3 font-display text-4xl text-cream-50 sm:text-5xl">{label}</h1>
          <p className="mt-2 text-cream-100/80">{filtered.length} recipes in this chapter</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SearchFilters
          filters={effective}
          onChange={(next) => setFilters({ ...next, category: categoryId })}
          resultCount={filtered.length}
        />
        <div className="mt-8">
          {filtered.length === 0 ? (
            <EmptyState title="Nothing here yet" body="Try adjusting search or filters." />
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
    </div>
  )
}
