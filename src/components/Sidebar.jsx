"use client";
import Image from "next/image";
import Logo from "../../public/images/twitterLogo.avif";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreatePost from "./CreatePost";
import UserInfoComponent from "./UserInfoComponent";
import { usePathname } from "next/navigation";
import { links } from "@/lib/navigationLinks";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@/services/notification/getAllNotifications.service";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  const { data } = useQuery({
    queryKey: ["getAllNotifications"],
    queryFn: () => getAllNotifications(userId),
  });

  const unseenCount = data?.filter((n)=>!n.seen).length || 0

  return (
    <div className='w-full'>
      <button
        onClick={() => router.push("/home")}
        className='cursor-pointer p-1 rounded-full hover:bg-gray-800'
      >
        <Image src={Logo} className='w-10 h-10' alt='logo' />
      </button>
      <div className='flex flex-col gap-2'>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.route;
          return (
            <div
              key={link.label}
              className='p-3 px-4 hover:bg-stone-800 w-fit rounded-full'
            >
              <Link
                href={link.route}
                className={`capitalize text-2xl relative flex items-center gap-2 ${
                  !isActive ? "text-stone-400 " : "font-semibold"
                }`}
              >
                {link.badge && unseenCount != 0 && (
                  <Badge
                    variant='secondary'
                    className={`absolute -top-2 -right-4 rounded-full ${
                      !isActive ? "bg-stone-400" : ""
                    } `}
                  >
                    {unseenCount}
                  </Badge>
                )}
                <Icon size={24} className={!isActive ? "text-stone-400" : ""} />

                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className='my-4'>
        <CreatePost />
      </div>
      <UserInfoComponent />
    </div>
  );
};

export default Sidebar;
