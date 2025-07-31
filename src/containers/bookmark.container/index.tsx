import { useBookmarkStore } from '@/store/useBookmarkStore'
import CardNews from '@/components/card-news'
import NotFound from './not-found'

export default function BookmarkContainer() {
  const { bookmarks } = useBookmarkStore()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Bookmarked Articles
      </h1>
      <div className="grid grid-cols-1 gap-3">
        {bookmarks.length === 0 && <NotFound />}
        {bookmarks.map((bookmark) => (
          <CardNews
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            author={bookmark.author}
            publishedDate={bookmark.publishedDate}
            shortDescription={bookmark.shortDescription}
            webUrl={bookmark.webUrl}
          />
        ))}
      </div>
    </div>
  )
}
