import { Link, useParams } from 'react-router-dom'
import { IngredientChecklist } from '../components/IngredientChecklist'
import { LoadingState } from '../components/LoadingState'
import { NutritionPanel } from '../components/NutritionPanel'
import { StarButton } from '../components/StarButton'
import { useFavorites } from '../hooks/useFavorites'
import { useRecipe } from '../hooks/useRecipes'
import { categoryLabel } from '../lib/categories'
import { recipeImage } from '../lib/images'
import { creditLine, writerForSource } from '../lib/credits'

export function RecipeDetailPage() {
  const { id } = useParams()
  const { recipe, loading, error } = useRecipe(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (loading) return <LoadingState />
  if (error) return <LoadingState label={error} />
  if (!recipe) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl text-sage-900">Recipe not found</h1>
        <Link to="/recipes" className="mt-4 inline-block text-terracotta-700 hover:underline">
          Back to recipes
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(recipe.id)
  const hasIngredients = recipe.ingredients.length > 0
  const hasMethod = recipe.method.length > 0

  return (
    <div>
      <section className="relative overflow-hidden border-b border-sage-200">
        <img
          src={recipeImage(recipe)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-950 via-sage-900/70 to-sage-900/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 text-sm text-cream-100/80">
            <Link to="/" className="hover:text-cream-50">
              Home
            </Link>
            <span>/</span>
            <Link to={`/category/${recipe.category}`} className="hover:text-cream-50">
              {categoryLabel(recipe.category)}
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-cream-50/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sage-800">
                  {categoryLabel(recipe.category)}
                </span>
                {recipe.starred && (
                  <span className="rounded-full bg-terracotta-500/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream-50">
                    Catalog starred
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-display text-4xl leading-tight text-cream-50 sm:text-5xl">
                {recipe.title}
              </h1>
              <p className="mt-3 text-cream-100/85">
                {creditLine({
                  source: recipe.source,
                  writer: recipe.writer || writerForSource(recipe.source),
                })}
              </p>
              <p className="mt-1 text-sm text-cream-100/70">
                Original inspiration:{' '}
                {recipe.sourceUrl ? (
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold underline decoration-terracotta-300/70 underline-offset-2 hover:text-cream-50"
                  >
                    {recipe.source}
                    {(recipe.writer || writerForSource(recipe.source))
                      ? ` · ${recipe.writer || writerForSource(recipe.source)}`
                      : ''}
                  </a>
                ) : (
                  <span className="font-semibold">
                    {recipe.source}
                    {(recipe.writer || writerForSource(recipe.source))
                      ? ` · ${recipe.writer || writerForSource(recipe.source)}`
                      : ''}
                  </span>
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cream-100/75">
                {recipe.time && <span>{recipe.time}</span>}
                {recipe.servings && <span>{recipe.servings}</span>}
              </div>
            </div>
            <StarButton active={favorite} onClick={() => toggleFavorite(recipe.id)} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {hasIngredients ? (
            <section className="rounded-2xl border border-sage-200 bg-cream-50 p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-2xl text-sage-900">Ingredients</h2>
              <p className="mb-4 mt-1 text-sm text-sage-500">Check items off as you prep</p>
              <IngredientChecklist recipeId={recipe.id} ingredients={recipe.ingredients} />
            </section>
          ) : (
            <section className="rounded-2xl border border-dashed border-sage-300 bg-cream-100/60 p-6">
              <h2 className="font-display text-2xl text-sage-900">Full recipe not archived</h2>
              <p className="mt-2 text-sage-600">
                This entry is from the catalog index. Open the original source for ingredients and
                method.
              </p>
              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-sage-800 px-4 py-2 text-sm font-semibold text-cream-50 hover:bg-sage-700"
                >
                  View on {recipe.source}
                </a>
              )}
              {recipe.notes && (
                <p className="mt-4 rounded-xl bg-cream-50 p-3 text-sm text-sage-600">{recipe.notes}</p>
              )}
            </section>
          )}

          {hasMethod && (
            <section className="rounded-2xl border border-sage-200 bg-cream-50 p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-2xl text-sage-900">Method</h2>
              <ol className="mt-4 space-y-4">
                {recipe.method.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-800 font-display text-sm text-cream-50">
                      {i + 1}
                    </span>
                    <p className="pt-1 leading-relaxed text-sage-800">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {recipe.notes && hasIngredients && (
            <section className="rounded-2xl border border-sage-200 bg-sage-50/80 p-5">
              <h2 className="font-display text-xl text-sage-900">Notes</h2>
              <p className="mt-2 text-sage-700">{recipe.notes}</p>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {recipe.nutrition ? (
            <NutritionPanel nutrition={recipe.nutrition} />
          ) : (
            <div className="rounded-2xl border border-sage-200 bg-cream-50 p-5 text-sm text-sage-600">
              Nutrition estimate not available for this recipe.
            </div>
          )}
          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm font-semibold text-sage-800 transition hover:border-terracotta-300 hover:text-terracotta-700"
            >
              <span>Open original recipe</span>
              <span aria-hidden>↗</span>
            </a>
          )}
        </aside>
      </div>
    </div>
  )
}
