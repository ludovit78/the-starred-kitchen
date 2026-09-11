import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'
import { categoryLabel } from '../lib/categories'
import { recipeImage } from '../lib/images'
import { StarButton } from './StarButton'

type Props = {
  recipe: Recipe
  favorite: boolean
  onToggleFavorite: () => void
}

export function RecipeCard({ recipe, favorite, onToggleFavorite }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-sage-200/80 bg-cream-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/recipe/${recipe.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={recipeImage(recipe)}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-950/55 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-cream-50/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sage-800">
            {categoryLabel(recipe.category)}
          </span>
          {recipe.hasFullRecipe && (
            <span className="rounded-full bg-sage-800/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream-50">
              Full recipe
            </span>
          )}
          {recipe.nutrition && (
            <span className="rounded-full bg-terracotta-600/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream-50">
              Nutrition
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <StarButton active={favorite} onClick={onToggleFavorite} size="sm" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/recipe/${recipe.id}`} className="font-display text-xl leading-snug text-sage-900 hover:text-terracotta-700">
          {recipe.title}
        </Link>
        <p className="text-sm text-sage-600">{recipe.source}</p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-sage-500">
          {recipe.time && <span>{recipe.time}</span>}
          {recipe.servings && <span>{recipe.servings}</span>}
          {recipe.nutrition && <span>{recipe.nutrition.calories} kcal / serving</span>}
        </div>
      </div>
    </article>
  )
}
