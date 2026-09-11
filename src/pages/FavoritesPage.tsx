import { Link } from 'react-router-dom'
import { EmptyState, LoadingState } from '../components/LoadingState'
import { RecipeCard } from '../components/RecipeCard'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipes } from '../hooks/useRecipes'

export function FavoritesPage() {
  const { recipes, loading, error } = useRecipes()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  if (loading) return <LoadingState />
  if (error) return <LoadingState label={error} />

  const list = recipes.filter((r) => favorites.includes(r.id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="font-display text-4xl text-sage-900">Favorites</h1>
      <p className="mt-2 text-sage-600">Saved on this device via localStorage.</p>
      <div className="mt-8">
        {list.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            body="Tap the star on any recipe card to save it here."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((recipe) => (
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
      <div className="mt-8">
        <Link to="/recipes" className="text-sm font-semibold text-terracotta-700 hover:underline">
          Browse all recipes →
        </Link>
      </div>
    </div>
  )
}
