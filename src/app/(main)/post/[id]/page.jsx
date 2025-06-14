"use client";
import AvatarComponent from "@/components/AvatarComponent";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { handleDeletePost } from "@/services/post/deletePost.service";
import { getSpecificPost } from "@/services/post/getSpecificPost.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const PostPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const { data, isPending } = useQuery({
    queryKey: ["getSpecificPost"],
    queryFn: () => getSpecificPost(id),
  });

  const date = new Date(data?.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (isPending) {
    return <div className="mt-20"><PostSkeleton/></div>
  }

  return (
    <div className='p-4'>
      <div className='flex gap-2 items-center'>
        <Button
          variant={"primary"}
          onClick={() => router.back()}
          className={"p-2 rounded-full hover:bg-gray-900"}
        >
          <ArrowLeft />
        </Button>
        <p className='text-xl font-bold'>Post</p>
      </div>
      <div className='flex justify-between items-center mt-8'>
        <div className='flex gap-2'>
          <HoverCard>
            <HoverCardTrigger className='cursor-pointer'>
              <AvatarComponent data={data} size={10} />
            </HoverCardTrigger>
            <HoverCardContent className='bg-black text-white'>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
            <div className=''>
              <Link
                href={`/profile/${data?.userId}`}
                className='font-semibold text-lg capitalize hover:underline cursor-pointer'
              >
                {data?.name || "Name"}
              </Link>
              <div className='flex gap-4 text-sm -mt-1'>
                <p className='text-muted-foreground'>
                  {data?.email || "email"}
                </p>
                <p className='text-muted-foreground'>{date}</p>
              </div>
            </div>
          </HoverCard>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"primary"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"bg-black text-white"}>
            <div>
              {data?.userId === currentUser && (
                <Button
                  onClick={() => {
                    handleDeletePost(info._id, queryClient);
                  }}
                  className={"w-full text-start hover:bg-red-900"}
                >
                  <Trash />
                  Delete
                </Button>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className='px-12'>{data?.content}</p>
    </div>
  );
};

export default PostPage;
