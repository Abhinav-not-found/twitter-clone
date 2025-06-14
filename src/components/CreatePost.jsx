import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { handleCreatePost } from "@/services/post/createPost.service";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/user/getUserInfo.service";
import AvatarComponent from "./AvatarComponent";
import { useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"secondary"}
            className={"w-full rounded-full text-lg font-bold py-6"}
          >
            Post
          </Button>
        </DialogTrigger>
        <DialogContent className={"bg-black text-white"}>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className='h-auto'>
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
            <div className='flex justify-end mt-10'>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
