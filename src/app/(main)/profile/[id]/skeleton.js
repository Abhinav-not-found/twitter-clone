"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OtherProfilePageSkeleton = () => {
  const router = useRouter();

  return (
    <div>
      <div className='flex gap-2 items-center p-2'>
        <Button
          variant={"primary"}
          onClick={() => router.back()}
          className={"p-2 rounded-full hover:bg-gray-900"}
        >
          <ArrowLeft />
        </Button>
        <Skeleton className='w-40 h-6 bg-stone-700' />
      </div>
      <div className='w-full h-48 bg-stone-800'></div>
      <div className='w-32 h-32 rounded-full bg-stone-700 ml-6 -mt-14 border-4 border-black'></div>
      <div className='w-full -mt-14 flex justify-end px-4'>
        <div className='flex gap-2'>
          <Skeleton className='w-24 h-10 rounded-full' />
        </div>
      </div>
      <div className='p-8'>
        <Skeleton className='w-32 h-8 mb-2' />
        <Skeleton className='w-48 h-5 mb-2' />
        <Skeleton className='w-full h-16 mb-4' />
        <div className='flex gap-4'>
          <Skeleton className='w-24 h-6' />
          <Skeleton className='w-24 h-6' />
        </div>
      </div>
      <div className='mt-2'>all posts by this user</div>
    </div>
  );
};

export default OtherProfilePageSkeleton;
