import type { ArticleDoc } from '@/types/news'

export const fetchNews = async (search?: string) => {
  const url = new URL(`${import.meta.env.VITE_NEWS_API_URL}/articlesearch.json`)
  url.searchParams.set('api-key', import.meta.env.VITE_NEWS_API_KEY!)
  if (search) {
    url.searchParams.set('q', search)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const extractKeywords = (
  docs: ArticleDoc[],
): Record<string, string[]> => {
  const keywordsMap = new Map<string, Set<string>>()

  docs.forEach((doc) => {
    doc.keywords.forEach(({ name, value }) => {
      if (!keywordsMap.has(name)) {
        keywordsMap.set(name, new Set())
      }
      keywordsMap.get(name)!.add(value)
    })
  })

  return Object.fromEntries(
    Array.from(keywordsMap.entries()).map(([key, value]) => [
      key,
      Array.from(value),
    ]),
  )
}
