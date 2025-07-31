import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ArrowUpRightIcon, CalendarIcon, BookmarkIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type CardNewsProps = {
  title: string
  author: string | null
  publishedDate: string
  shortDescription: string
  webUrl: string
}

export default function CardNews({
  title,
  author,
  publishedDate,
  shortDescription,
  webUrl,
}: CardNewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {author}{' '}
          <Badge variant="outline">
            <CalendarIcon />
            {new Date(publishedDate).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{shortDescription}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" variant="secondary" className="hover:cursor-pointer">
          <BookmarkIcon />
        </Button>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a href={webUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="hover:cursor-pointer">
                Read more
                <ArrowUpRightIcon />
              </Button>
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-100 h-80">
            <iframe className="w-full h-full" src={webUrl} title={title} />
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  )
}
