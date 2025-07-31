import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  SearchIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  BookmarkIcon,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/')({
  component: Index,
})

const formSearch = z.object({
  search: z.string().min(3, 'Search must be at least 3 characters'),
})

type formType = z.infer<typeof formSearch>

const fetchNews = async (search?: string) => {
  const url = new URL(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  )
  url.searchParams.set('api-key', 'EUBSdckDH7dZkkUOV2a4OkdSQqBk8Qxg')
  if (search) {
    url.searchParams.set('q', search)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const extractKeywords = (docs: any[]) => {
  const keywordsMap = new Map<string, Set<string>>()

  docs.forEach((doc) => {
    doc.keywords.forEach((keywords: { name: string; value: string }) => {
      const key = keywords.name
      const val = keywords.value
      if (!keywordsMap.has(key)) {
        keywordsMap.set(key, new Set())
      }
      keywordsMap.get(key)!.add(val)
    })
  })

  return Object.fromEntries(
    Array.from(keywordsMap.entries()).map(([key, value]) => [
      key,
      Array.from(value),
    ]),
  )
}

const SkeletonLoading = () => {
  return (
    <>
      {[...Array(4).keys()].map((index) => (
        <div key={String(index)} className="animate-pulse">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[200px] mt-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[200px] mt-2" />
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  )
}

function Index() {
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

  const onSubmit = (data: formType) => {
    setSuggestions([])
    setSearchTerm(data.search)
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-3 relative w-full">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="search here ..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              const value = e.target.value.toLowerCase()
                              if (value.length > 2 && data?.keywords) {
                                const matches = Object.values(data.keywords)
                                  .flat()
                                  .filter((kw) =>
                                    kw.toLowerCase().includes(value),
                                  )
                                  .slice(0, 6)
                                setSuggestions(matches)
                              } else {
                                setSuggestions([])
                              }
                            }}
                          />
                          {suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded shadow text-sm">
                              {suggestions.map((sug, i) => (
                                <li
                                  key={i}
                                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    form.setValue('search', sug)
                                    setSuggestions([])
                                    setSearchTerm(sug)
                                  }}
                                >
                                  {sug}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <SearchIcon />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <SkeletonLoading />}

      {data &&
        data.docs.length > 0 &&
        data.docs.map((doc: any, index: number) => (
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
            <Card key={doc._id}>
              <CardHeader>
                <CardTitle>{doc.headline.main}</CardTitle>
                <CardDescription>
                  {doc.byline?.original}{' '}
                  <Badge variant="outline">
                    <CalendarIcon />
                    {new Date(doc.pub_date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{doc.snippet}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="hover:cursor-pointer"
                >
                  <BookmarkIcon />
                </Button>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a
                      href={doc.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="hover:cursor-pointer">
                        Read more
                        <ArrowUpRightIcon />
                      </Button>
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-100 h-80">
                    <iframe
                      className="w-full h-full"
                      src={doc.web_url}
                      title={doc.headline.main}
                    />
                  </HoverCardContent>
                </HoverCard>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

      {!isLoading && data?.docs.length === 0 && (
        <p className="text-center text-muted-foreground">No articles found.</p>
      )}
    </div>
  )
}
