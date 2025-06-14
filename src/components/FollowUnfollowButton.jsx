import { Button } from "./ui/button";

const FollowUnfollowButton = ({
  data,
  userId,
  isHovering,
  setIsHovering,
  followMutation = {},
  unfollowMutation = {},
}) => {
  const isFollowing = data?.followers?.includes(userId);

  return (
    <div className='w-full -mt-14 flex justify-end px-4'>
      <div className='flex gap-2'>
        {isFollowing ? (
          <Button
            onClick={() => unfollowMutation.mutate()}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className='rounded-full font-bold border hover:text-red-900 hover:border-red-900 text-center'
            disabled={unfollowMutation?.isLoading}
          >
            {unfollowMutation?.isLoading
              ? "Processing"
              : isHovering
              ? "UnFollow"
              : "Following"}
          </Button>
        ) : (
          <Button
            onClick={() => followMutation.mutate()}
            variant='secondary'
            className='rounded-full font-bold'
            disabled={followMutation?.isLoading}
          >
            {followMutation?.isLoading ? "Processing" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default FollowUnfollowButton
