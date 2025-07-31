import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type CardNewsProps } from '@/components/card-news'

export type Bookmark = CardNewsProps & {}

type BookmarkState = {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) => {
        const exists = get().bookmarks.some((b) => b.id === bookmark.id)
        if (!exists) {
          set((state) => ({
            bookmarks: [...state.bookmarks, bookmark],
          }))
        }
      },
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }))
      },
      isBookmarked: (id) => {
        return get().bookmarks.some((b) => b.id === id)
      },
    }),
    {
      name: 'readable-bookmark-storage',
    },
  ),
)
