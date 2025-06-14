"use client";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/user/getUserInfo.service";
import AvatarComponent from "./AvatarComponent";
import { handleCreatePost } from "@/services/post/createPost.service";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import UploadcareImage from "@uploadcare/nextjs-loader";

const CreatePost2 = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });

  return (
    <div className='p-4 h-auto border border-x-0 border-t-0 border-b-stone-600'>
      <div className='flex gap-2'>
        <AvatarComponent data={data} size={10} />
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          type='text'
          placeholder="What's happening?"
          className='text-xl placeholder:text-xl outline-none w-full resize-none'
        />
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div>
          <button className='cursor-pointer ml-12 text-muted-foreground'>
            <Image className='size-4' alt='hello' />
          </button>
        </div>
        <Button
          onClick={() =>
            handleCreatePost(input, setOpen, setInput, queryClient)
          }
          variant={"secondary"}
          disabled={!input.length > 0}
          className={"rounded-full"}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost2;
