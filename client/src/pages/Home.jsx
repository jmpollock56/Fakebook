import React from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post"; 



export default function Home(){
  const posts = [{name: "Josh Pollock", postAge: 4, content: "I really love learning Tailwind! It's really helped me learn morem about css!", likes: 19, comments: 4},
  {name: "Denise Rowley", postAge: 21, content: "I am posting this to tell Fakebook that I do not want anything on my profile to be used for any of their business! #FreeSpeech", likes: 2, comments: 4},
  {name: "Jordan Rowley", postAge: 1, content: "Anybody know when the new Star Wars movies are coming out!?", likes: 19, comments: 14},
  {name: "Jay Zenger", postAge: 12, content: "Who wants to meet at Winget tomorrow and catch some whoop ass??", likes: 22, comments: 40}];

  return (
    <div className="static h-[100vh]">
      <NavBar />
      <div className="relative flex flex-col w-[600px] h-full mx-auto top-20 box-content">
        <CreatePost />
        <div className="flex flex-col mt-10">
          {posts.map((post, i) =>{
            return <Post key={i} name={post.name} postAge={post.postAge} content={post.content} likes={post.likes} comments={post.comments}/>;
          })}
        </div>
      </div>
    </div>
  );
}