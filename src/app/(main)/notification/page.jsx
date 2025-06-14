"use client";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton";
import { Button } from "@/components/ui/button";
import { getAllNotifications } from "@/services/notification/getAllNotifications.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { markAllAsRead } from "@/services/notification/markAllRead.service.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NotificationPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const { data, isLoading } = useQuery({
    queryKey: ["getAllNotifications"],
    queryFn: () => getAllNotifications(userId),
  });

  const { mutate: markRead, isPending } = useMutation({
    mutationFn: () => markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
    },
  });

  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-between items-baseline'>
        <h1 className='text-3xl font-bold mb-4'>Notifications</h1>
        <Button onClick={() => markRead()} className={" hover:bg-stone-800 "}>
          {isPending ? "Marking..." : "Mark as read"}
        </Button>
      </div>
      {isLoading ? (
        <NotificationSkeleton />
      ) : data?.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        data?.map((notification) => (
          <div
            key={notification._id}
            className={`p-4 rounded-lg ${
              notification.seen ? "" : "bg-stone-800"
            }`}
          >
            <p className='text-sm text-white'>
              {notification.type === "follow" && (
                <span>
                  <strong
                    onClick={() =>
                      router.push(`/profile/${notification.senderId}`)
                    }
                    className='capitalize cursor-pointer hover:underline'
                  >
                    {notification?.senderName || "Name"}
                  </strong>{" "}
                  followed you.
                </span>
              )}
            </p>
            <p className='text-xs text-gray-400'>
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationPage;
