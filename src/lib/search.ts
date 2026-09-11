import type { FilterState, Recipe } from '../types/recipe'

export function matchesFilters(recipe: Recipe, filters: FilterState): boolean {
  if (filters.category !== 'all' && recipe.category !== filters.category) return false
  if (filters.starredOnly && !recipe.starred) return false
  if (filters.fullRecipeOnly && !recipe.hasFullRecipe) return false
  if (filters.nutritionOnly && !recipe.nutrition) return false

  const q = filters.query.trim().toLowerCase()
  if (!q) return true

  const inTitle = recipe.title.toLowerCase().includes(q)
  const inSource = recipe.source.toLowerCase().includes(q)
  const inIngredients = recipe.ingredients.some((i) => i.toLowerCase().includes(q))
  return inTitle || inSource || inIngredients
}

export function sortRecipes(recipes: Recipe[]): Recipe[] {
  return [...recipes].sort((a, b) => {
    if (Boolean(a.hasFullRecipe) !== Boolean(b.hasFullRecipe)) {
      return a.hasFullRecipe ? -1 : 1
    }
    if (Boolean(a.starred) !== Boolean(b.starred)) {
      return a.starred ? -1 : 1
    }
    return a.title.localeCompare(b.title)
  })
}
