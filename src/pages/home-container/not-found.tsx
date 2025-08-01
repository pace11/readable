import { CircleQuestionMarkIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 p-4 text-muted-foreground">
      <CircleQuestionMarkIcon className="h-10 w-10 " />
      <p className="text-center">No articles found</p>
    </div>
  )
}
