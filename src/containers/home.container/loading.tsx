import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonLoading() {
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
