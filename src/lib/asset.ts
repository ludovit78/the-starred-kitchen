export function asset(path: string): string {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  const clean = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
