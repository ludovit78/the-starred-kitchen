import { asset } from './asset'

export const CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast', image: '/images/chapter-breakfast.jpg' },
  { id: 'soups', label: 'Soups', image: '/images/chapter-soups.jpg' },
  { id: 'salads', label: 'Salads', image: '/images/chapter-salads.jpg' },
  { id: 'mains', label: 'Mains', image: '/images/chapter-mains.jpg' },
  { id: 'pasta', label: 'Pasta', image: '/images/chapter-pasta.jpg' },
  { id: 'bread', label: 'Bread', image: '/images/chapter-bread.jpg' },
  { id: 'raw', label: 'Raw', image: '/images/chapter-raw.jpg' },
  { id: 'desserts', label: 'Desserts', image: '/images/chapter-desserts.jpg' },
  { id: 'drinks', label: 'Drinks', image: '/images/chapter-breakfast.jpg' },
] as const

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id.charAt(0).toUpperCase() + id.slice(1)
}

export function categoryImage(id: string): string {
  return asset(CATEGORIES.find((c) => c.id === id)?.image ?? '/images/cover.jpg')
}
