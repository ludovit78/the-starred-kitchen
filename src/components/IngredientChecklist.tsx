import { useEffect, useState } from 'react'

export function IngredientChecklist({
  recipeId,
  ingredients,
}: {
  recipeId: string
  ingredients: string[]
}) {
  const key = `sk-ingredients:${recipeId}`
  const [checked, setChecked] = useState<boolean[]>(() => ingredients.map(() => false))

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const parsed = JSON.parse(raw) as boolean[]
        if (Array.isArray(parsed) && parsed.length === ingredients.length) {
          setChecked(parsed)
          return
        }
      }
    } catch {
      /* ignore */
    }
    setChecked(ingredients.map(() => false))
  }, [key, ingredients])

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = prev.map((v, i) => (i === index ? !v : v))
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }

  return (
    <ul className="space-y-2">
      {ingredients.map((item, i) => (
        <li key={`${i}-${item}`}>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-1.5 hover:bg-sage-50">
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => toggle(i)}
              className="mt-1 h-4 w-4 rounded border-sage-300 text-sage-700 focus:ring-sage-300"
            />
            <span className={`text-sage-800 ${checked[i] ? 'line-through text-sage-400' : ''}`}>
              {item}
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}
