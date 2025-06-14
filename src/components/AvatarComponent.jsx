import { Avatar, AvatarFallback } from "./ui/avatar";
import React from "react";

const AvatarComponent = ({ data, size}) => {
  return (
    <div>
      <Avatar className={`w-${size} h-${size}`}>
        <AvatarFallback className={"uppercase bg-gray-800"}>
          {data?.name?.slice(0, 1)[0] || "z"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
