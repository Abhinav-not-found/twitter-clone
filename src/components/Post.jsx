import React from "react";
import {
  Bookmark,
  BookmarkCheck,
  Ellipsis,
  Heart,
  MessageCircle,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu,  DropdownMenuContent,  DropdownMenuTrigger,} from "./ui/dropdown-menu";
import { handleDeletePost } from "@/services/post/deletePost.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HoverCardComponent from "./HoverCardComponent";
import { handleBookmark } from "@/services/bookmark/handleBookmark";
import { deleteBookmark } from "@/services/bookmark/deleteBookmark";
import { getBookmarks } from "@/services/bookmark/getBookmarks";
import { useLikeMutations } from "@/services/post/useLikeMutation";

const Post = ({ info }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const date = new Date(info.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const { data } = useQuery({
    queryKey: ["getBookmarks"],
    queryFn: () => getBookmarks(userId),
  });

  const isBookmarked = data?.data?.some(
    (bookmark) => bookmark.postId === info._id
  );

  const likesIncluded = info.likes.includes(userId);

 const { likeMutation, likeDecreaseMutation } = useLikeMutations(info._id, userId);



  return (
    <div
      onClick={() => router.push(`/post/${info._id}`)}
      className='p-4 border border-x-0 border-t-0 border-stone-600 cursor-pointer'
    >
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <HoverCardComponent info={info} />
          <div className=''>
            <Link
              href={`/profile/${info.userId}`}
              onClick={(e) => e.stopPropagation()}
              className='font-semibold text-lg capitalize hover:underline cursor-pointer'
            >
              {info?.name || "Name"}
            </Link>
            <div className='flex gap-4 text-sm -mt-1'>
              <p className='text-muted-foreground'>{info.email || "email"}</p>
              <p className='text-muted-foreground'>{date}</p>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={(e) => e.stopPropagation()} variant={"primary"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"bg-black text-white"}>
            <div>
              {info.userId === userId && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
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
      <p className='px-12'>{info.content}</p>
      <div className='flex justify-between px-10 mt-5 '>
        <Button
          onClick={(e) => e.stopPropagation()}
          className={
            "bg-black hover:text-blue-500 hover:bg-blue-900/30 text-muted-foreground"
          }
        >
          <MessageCircle className='w-4 h-auto' />
          <p>123</p>
        </Button>

        {likesIncluded ? (
          //unlike
          <Button
            onClick={(e) => {
              e.stopPropagation();
              likeDecreaseMutation.mutate();
            }}
            className={
              "bg-black hover:text-red-500 hover:bg-red-900/30 text-muted-foreground"
            }
          >
            <Heart className='w-4 h-auto text-red-500' />
            <p>{info.likes.length}</p>
          </Button>
        ) : (
          //like
          <Button
            onClick={(e) => {
              e.stopPropagation();
              likeMutation.mutate();
            }}
            className={
              "bg-black hover:text-red-500 hover:bg-red-900/30 text-muted-foreground"
            }
          >
            <Heart className='w-4 h-auto' />
            <p>{info?.likes.length}</p>
          </Button>
        )}

        {isBookmarked ? (
          <Button
            onClick={async (e) => {
              e.stopPropagation();
              await deleteBookmark(userId, info._id);
              queryClient.invalidateQueries(["getBookmarks"]);
            }}
            className={
              "bg-black hover:text-yellow-500 hover:bg-yellow-900/30 text-muted-foreground"
            }
          >
            <BookmarkCheck className='w-4 h-auto text-yellow-500' />
          </Button>
        ) : (
          <Button
            onClick={async (e) => {
              e.stopPropagation();
              await handleBookmark(userId, info._id);
              queryClient.invalidateQueries(["getBookmarks"]);
            }}
            className={
              "text-muted-foreground hover:bg-yellow-900/30 hover:text-yellow-500"
            }
          >
            <Bookmark className='w-4 h-auto' />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Post;
