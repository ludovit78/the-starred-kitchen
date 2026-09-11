import { Link } from 'react-router-dom'
import { CategoryChips } from '../components/CategoryChips'
import { LoadingState } from '../components/LoadingState'
import { RecipeCard } from '../components/RecipeCard'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipes } from '../hooks/useRecipes'
import { asset } from '../lib/asset'
import { CATEGORIES } from '../lib/categories'
import { MEAL_PHOTO_BY_RECIPE_ID } from '../lib/images'
import { PAYPAL_ME_URL } from '../lib/paypal'

export function HomePage() {
  const { recipes, loading, error } = useRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (loading) return <LoadingState />
  if (error) return <LoadingState label={error} />

  const withMealPhoto = (r: (typeof recipes)[number]) =>
    Boolean(MEAL_PHOTO_BY_RECIPE_ID[r.id] || (r.image && r.image.includes('/images/meals/')))

  const full = recipes.filter((r) => r.hasFullRecipe)
  // Prefer cards that have real meal JPGs so featured never looks blank
  const photoFirst = [...full].sort((a, b) => Number(withMealPhoto(b)) - Number(withMealPhoto(a)))
  const mealPhotoRecipes = photoFirst.filter(withMealPhoto)
  const starred = photoFirst.filter((r) => r.starred)
  const featured =
    mealPhotoRecipes.length >= 3
      ? mealPhotoRecipes.slice(0, 6)
      : (starred.length >= 3 ? starred : photoFirst).slice(0, 6)
  const fullCount = recipes.filter((r) => r.hasFullRecipe).length

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={asset('images/cover.jpg')} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-950/85 via-sage-900/70 to-sage-900/35" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-200">
            Local cookbook
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
            The Starred Kitchen
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
            A warm collection of {recipes.length} recipes — {fullCount} with full ingredients,
            method, and nutrition estimates — ready to cook offline.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/recipes"
              className="rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-md transition hover:bg-terracotta-400"
            >
              Browse all recipes
            </Link>
            <Link
              to="/recipes?full=1"
              className="rounded-full border border-cream-100/40 bg-cream-50/10 px-5 py-2.5 text-sm font-semibold text-cream-50 backdrop-blur transition hover:bg-cream-50/20"
            >
              Full recipes only
            </Link>
            <a
              href={PAYPAL_ME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-terracotta-300/50 bg-terracotta-500/90 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-md transition hover:bg-terracotta-400"
            >
              Buy with PayPal
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-sage-900">Categories</h2>
            <p className="mt-1 text-sage-600">Browse by chapter</p>
          </div>
        </div>
        <CategoryChips includeAll={false} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = recipes.filter((r) => r.category === cat.id).length
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl border border-sage-200 shadow-sm"
              >
                <img
                  src={asset(cat.image)}
                  alt=""
                  className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/75 via-sage-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-cream-50">
                  <div className="font-display text-2xl">{cat.label}</div>
                  <div className="text-sm text-cream-100/80">{count} recipes</div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-t border-sage-200/70 bg-cream-100/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-sage-900">Featured starred recipes</h2>
              <p className="mt-1 text-sage-600">Full write-ups with nutrition estimates</p>
            </div>
            <Link to="/favorites" className="text-sm font-semibold text-terracotta-700 hover:underline">
              Your favorites →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favorite={isFavorite(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
