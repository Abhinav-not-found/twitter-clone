"use client";

import Sidebar from "@/components/Sidebar";

import { Search } from "lucide-react";

const layout = ({ children }) => {
  return (
    <div className='w-[85%] h-screen m-auto flex'>
      
      <div className='h-screen w-2/6 border border-y-0 border-l-0 border-r-stone-600  pr-4'>
        <Sidebar />
      </div>

      <div className='h-screen w-5/6 border border-y-0 border-l-0 border-r-stone-600'>
        {children}
      </div>

      <div className='h-screen w-3/6 py-1 px-6'>
        <div className='flex gap-1 items-center py-2 px-3 border rounded-full border-stone-500'>
          <Search className='w-4 h-4 text-stone-500' />
          <input
            type='text'
            placeholder='Search'
            className='outline-none placeholder:text-stone-200'
          />
        </div>
      </div>

    </div>
  );
};

export default layout;
