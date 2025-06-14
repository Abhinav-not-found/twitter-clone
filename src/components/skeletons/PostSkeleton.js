import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostSkeleton = () => {
  return (
    <div className="w-full h-auto p-4 border border-x-0 border-t-0 border-stone-600">
      <div className="flex gap-2 w-full">
        <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
        <div className="w-full">
          <Skeleton className="w-60 h-7"></Skeleton>
          <Skeleton className="w-60 h-4 mt-2"></Skeleton>
          <Skeleton className="w-[30rem] h-4 mt-4"></Skeleton>
          <Skeleton className="w-[30rem] h-4 mt-2"></Skeleton>
          <Skeleton className="w-[30rem] h-4 mt-2"></Skeleton>
          <Skeleton className="w-[30rem] h-4 mt-2"></Skeleton>
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton
