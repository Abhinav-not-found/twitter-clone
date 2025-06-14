"use client";
import { Button } from "@/components/ui/button";
import { getSpecificUserInfo } from "@/services/user/getSpecificUserInfo.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import OtherProfilePageSkeleton from "./skeleton";
import { useState } from "react";
import { handleFollow } from "@/services/user/handleFollow.service";
import { handleUnfollow } from "@/services/user/handleUnfollow.service";
import FollowUnfollowButton from "@/components/FollowUnfollowButton";

const OtherProfilePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isHovering, setIsHovering] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const { data, isLoading } = useQuery({
    queryKey: ["getSpecificUserInfo", id],
    queryFn: () => getSpecificUserInfo(id),
    enabled: !!id,
  });

  const followMutation = useMutation({
    mutationFn: () => handleFollow(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getSpecificUserInfo", id]);
    },
    onError: (error) => {
      console.error("Failed to follow user: ", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => handleUnfollow(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getSpecificUserInfo", id]);
    },
    onError: (error) => {
      console.error("Failed to unfollow user: ", error);
    },
  });

  if (isLoading) return <OtherProfilePageSkeleton />;
  if (!data) return <p className='p-4'>User not found</p>;
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
        <p className='text-xl font-bold capitalize'>{data?.name}</p>
      </div>
      <div className='w-full h-48 bg-stone-800'></div>
      <div className='w-32 h-32 rounded-full bg-stone-700 ml-6 -mt-14 border-4 border-black'></div>

      {id !== userId && (
        <FollowUnfollowButton
          data={data}
          userId={userId}
          isHovering={isHovering}
          setIsHovering={setIsHovering}
          followMutation={followMutation}
          unfollowMutation={unfollowMutation}
        />
      )}

      <div className='p-8'>
        <p className='text-2xl font-bold capitalize'>{data?.name}</p>
        <p className='text-muted-foreground'>{data?.email}</p>
        <p className='my-2'>{data?.bio || "bio"}</p>
        <div className='flex gap-4'>
          <p className='text-muted-foreground'>
            <span className='font-semibold text-white'>
              {data?.following?.length || 0}
            </span>{" "}
            Following
          </p>
          <p className='text-muted-foreground'>
            <span className='font-semibold text-white'>
              {data?.followers?.length || 0}
            </span>{" "}
            Followers
          </p>
        </div>
      </div>
      <div className='mt-2'>all posts by this user</div>
    </div>
  );
};

export default OtherProfilePage;
