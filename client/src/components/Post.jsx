import React from "react";
import { AiOutlineLike } from "react-icons/ai";

export default function Post({name, postAge, content, likes, comments}){

  return (
    <div className="flex flex-col bg-sky-500 rounded-md box-content p-4 shadow-md mb-5">

      <div className="flex flex-row justify-between">

        <div className="flex flex-row items-center">

          <img className="size-8 rounded-full mr-2" src="https://practicaltyping.com/wp-content/uploads/2019/06/Hinata.PNG.png" alt="profile" />

          <div className="flex flex-col items-start">
            <div className="font-semibold">{name}</div>
            <div className="static text-xs ">{postAge}d</div>
          </div>

        </div>
        <div className="topright">...</div>
      </div>

      <div>{content}</div>

      <div className="flex flex-row justify-between mt-2 mb-2">
        <div className="flex w-7 justify-between items-center">
          <AiOutlineLike className="bg-white rounded-full"/>
          <div>{likes}</div>
        </div>
        <div>{comments} Comments</div>
      </div>

      <hr />

      <div className="flex justify-evenly items-center mt-2 box-content h-10">
        <div className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md">Like</div>
        <div className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md">Comment</div>
        <div className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md">Share</div>
      </div>
    </div>
  );
}