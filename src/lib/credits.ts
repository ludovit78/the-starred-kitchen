const WRITER_BY_SOURCE: Record<string, string> = {
  'Lazy Cat Kitchen': 'Ania',
  'Holy Cow Vegan': 'Vaishali',
  'Elephantastic Vegan': 'Elephantastic Vegan',
  'Minimalist Baker': 'Dana Shultz',
  'Rabbit and Wolves': 'Julie',
  'Rabbit & Wolves': 'Julie',
  'Nora Cooks': 'Nora',
  'Forks Over Knives': 'Forks Over Knives',
  'The Vegan 8': 'Brandie',
  'World of Vegan': 'World of Vegan',
  'Vegan Richa': 'Richa Hingle',
  'Vegan Food and Living': 'Vegan Food & Living',
  'thefeedfeed.com': 'the feedfeed',
}

export function writerForSource(source: string | null | undefined): string | null {
  if (!source) return null
  if (WRITER_BY_SOURCE[source]) return WRITER_BY_SOURCE[source]
  // fuzzy
  for (const [k, v] of Object.entries(WRITER_BY_SOURCE)) {
    if (source.toLowerCase().includes(k.toLowerCase())) return v
  }
  return null
}

export function creditLine(opts: {
  source?: string | null
  writer?: string | null
}): string {
  const writer = opts.writer || writerForSource(opts.source)
  const source = opts.source || 'the original kitchen'
  if (writer && writer !== source) {
    return `Rewritten for The Starred Kitchen · inspired by ${writer} (${source})`
  }
  return `Rewritten for The Starred Kitchen · inspired by ${source}`
}
