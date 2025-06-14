import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import AvatarComponent from "./AvatarComponent";
import Link from "next/link";
import { Button } from "./ui/button";

const HoverCardComponent = ({ info }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className='cursor-pointer'>
        <AvatarComponent data={info} size={10} />
      </HoverCardTrigger>
      <HoverCardContent className='bg-black text-white p-4 w-[20rem] rounded-2xl border-stone-600'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <AvatarComponent data={info} size={16} />
            <div>
              <Link
                href={`/profile/${info.userId}`}
                onClick={(e) => e.stopPropagation()}
                className='font-semibold text-xl capitalize hover:underline cursor-pointer'
              >
                {info?.name || "Name"}
              </Link>
              <p className='text-muted-foreground -mt-1'>
                {info.email || "email"}
              </p>
            </div>
            <p className='my-2'>{info?.bio || "bio"}</p>
            <div className='flex gap-4 text-sm'>
              <p className='text-muted-foreground'>
                <span className='font-semibold text-white'>123</span> Following
              </p>
              <p className='text-muted-foreground'>
                <span className='font-semibold text-white'>123</span> Followers
              </p>
            </div>
          </div>
          <Button variant={"secondary"} className={"rounded-full font-bold"}>
            Follow
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
