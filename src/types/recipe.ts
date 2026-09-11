export interface Nutrition {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g?: number
  sodium_mg?: number
  nutritionSource: 'estimate' | string
  per: 'serving' | string
}

export interface Recipe {
  id: string
  title: string
  source: string
  sourceUrl?: string | null
  /** Named writer / creator for attribution */
  writer?: string | null
  /** Short credit line shown in UI */
  credit?: string | null
  category: string
  servings?: string | null
  time?: string | null
  ingredients: string[]
  method: string[]
  notes?: string | null
  starred?: boolean
  image?: string | null
  nutrition?: Nutrition | null
  hasFullRecipe?: boolean
}

export type FilterState = {
  query: string
  category: string | 'all'
  starredOnly: boolean
  fullRecipeOnly: boolean
  nutritionOnly: boolean
}
