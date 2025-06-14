import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLogoutMutation } from "@/hooks/logoutHook";
import { getUserInfo } from "@/services/user/getUserInfo.service";
import AvatarComponent from "./AvatarComponent";
import { Skeleton } from "./ui/skeleton";

const UserInfoComponent = () => {
  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  const { data: user, isPending } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });

  return (
    <div className='w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger className='w-full'>
          <div className='w-full p-3 rounded-full hover:bg-stone-800 cursor-pointer flex items-center gap-4'>
            <AvatarComponent data={user} size={10} />
            <div className='text-sm'>
              {isPending ? (
                <Skeleton className='w-32 h-4' />
              ) : (
                <p className='font-semibold text-left uppercase truncate max-w-[150px]'>
                  {user?.name?.split(" ").slice(0, 2).join(" ") || "loading..."}
                </p>
              )}
              {isPending ? (
                <Skeleton className='w-32 h-3 mt-2' />
              ) : (
                <p className='text-muted-foreground'>
                  {user?.email.slice(0, 17) || "loading..."}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-black w-full"}>
          <div>
            <Button
              onClick={handleLogout}
              variant={"secondary"}
              className={"w-full"}
            >
              {logoutMutation.isPending ? "Processing" : "Logout"}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserInfoComponent;
