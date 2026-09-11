import type { Nutrition } from '../types/recipe'

export function NutritionPanel({ nutrition }: { nutrition: Nutrition }) {
  const items = [
    { label: 'Calories', value: `${nutrition.calories}`, unit: 'kcal' },
    { label: 'Protein', value: `${nutrition.protein_g}`, unit: 'g' },
    { label: 'Carbs', value: `${nutrition.carbs_g}`, unit: 'g' },
    { label: 'Fat', value: `${nutrition.fat_g}`, unit: 'g' },
  ]
  if (nutrition.fiber_g != null) items.push({ label: 'Fiber', value: `${nutrition.fiber_g}`, unit: 'g' })
  if (nutrition.sodium_mg != null)
    items.push({ label: 'Sodium', value: `${nutrition.sodium_mg}`, unit: 'mg' })

  return (
    <section className="rounded-2xl border border-sage-200 bg-gradient-to-br from-cream-50 to-sage-50 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className="font-display text-2xl text-sage-900">Nutrition</h2>
        <span className="rounded-full bg-terracotta-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-terracotta-800">
          {nutrition.nutritionSource || 'estimate'}
        </span>
        <span className="text-sm text-sage-600">per {nutrition.per || 'serving'}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-cream-50/80 px-3 py-3 text-center border border-sage-100">
            <div className="font-display text-2xl text-sage-900">
              {item.value}
              <span className="ml-0.5 text-sm font-sans font-medium text-sage-500">{item.unit}</span>
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-sage-500">{item.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-sage-500">
        Values are approximate estimates based on typical ingredients and stated servings — not lab-verified.
      </p>
    </section>
  )
}
