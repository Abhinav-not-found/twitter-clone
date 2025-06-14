'use client'
import React, { useState } from "react";
import CreatePost2 from "@/components/CreatePost2";
import Main from "./_component/Main";

const HomePage = () => {

  const [tab, setTab] = useState("for-you");
  const getTabClass = (name) =>
    `w-full p-5 cursor-pointer hover:bg-stone-900 ${
      tab === name ? "underline" : ""
    }`;
  
  return (
    <div>
      <div className='flex border border-x-0 border-t-0 border-stone-600'>
        <button
          onClick={() => setTab("for-you")}
          className={getTabClass("for-you")}
        >
          For you
        </button>
        <button
          onClick={() => setTab("following")}
          className={getTabClass("following")}
        >
          Following
        </button>
      </div>
      <CreatePost2 />
      {tab === "for-you" && <Main/>}
      {tab === "following" && <>following</>}
    </div>
  );
};

export default HomePage;
