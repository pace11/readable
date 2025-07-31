import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CardNews from '@/components/card-news'
import SkeletonLoading from './loading'
import SearchForm from '@/components/search-form'
import NotFound from './not-found'
import { fetchNews, extractKeywords } from '@/lib/news'
import type { ArticleDoc } from '@/types/news'

const formSearch = z.object({
  search: z.string().min(3, 'Search must be at least 3 characters'),
})

export type formType = z.infer<typeof formSearch>

export default function HomeContainer() {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  const form = useForm<formType>({
    defaultValues: { search: '' },
    resolver: zodResolver(formSearch),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['news', searchTerm],
    queryFn: () => fetchNews(searchTerm),
    select: (res) => ({
      docs: res.response.docs,
      keywords: extractKeywords(res.response.docs),
    }),
  })

  const handleSearch = (search: string) => {
    setSuggestions([])
    setSearchTerm(search)
  }

  const handleSuggest = (input: string) => {
    const lower = input.toLowerCase()
    if (lower.length > 2 && data?.keywords) {
      const matches = Object.values(data.keywords)
        .flat()
        .filter((kw) => kw.toLowerCase().includes(lower))
        .slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <SearchForm
              suggestions={suggestions}
              onSearch={handleSearch}
              onSuggest={handleSuggest}
            />
          </FormProvider>
        </CardContent>
      </Card>

      {isLoading && <SkeletonLoading />}

      {data &&
        data.docs.length > 0 &&
        data.docs.map((doc: ArticleDoc, index: number) => (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: 'backIn',
              delay: index * 0.1,
            }}
          >
            <CardNews
              id={doc._id}
              title={doc.headline.main}
              author={doc.byline?.original || null}
              publishedDate={doc.pub_date}
              shortDescription={doc.snippet}
              webUrl={doc.web_url}
            />
          </motion.div>
        ))}

      {!isLoading && data?.docs.length === 0 && <NotFound />}
    </div>
  )
}
