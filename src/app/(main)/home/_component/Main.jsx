import Post from "@/components/Post";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { getAllPosts } from "@/services/post/getAllPosts.service";
import { useQuery } from "@tanstack/react-query";

const Main = () => {
  const { data, isPending } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });
  return (
    <div>
      {isPending ? (
        <PostSkeleton />
      ) : (
        data?.map((post) => {
          return <Post key={post._id} info={post} />;
        })
      )}
    </div>
  );
};

export default Main;
