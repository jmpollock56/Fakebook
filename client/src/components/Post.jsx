import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { AiOutlineLike } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import "../styles/post.css";

export default function Post({ post, currentUser }) {

  const [isLiked, setIsLiked] = useState(localStorage.getItem(`isLiked-${post.post_id}`) === "true" ? true : false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.postComments);
  const [commentContent, setCommentContent] = useState("");
  

  
  useEffect(() => {
    for(let i = 0; i < currentUser.userLikes.length; i++){
      if(post.post_id === currentUser.userLikes[i].likes_post_id){
        setIsLiked(true);
        localStorage.setItem(`isLiked-${post.post_id}`, "true");
        return;
      }
    }
  },[]);

  async function handleLike() {
    if(!isLiked){
      try {
       
        const response = await fetch('/api/posts/like/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: currentUser.user_id, post_id: post.post_id }),
        });
        

        if (response.ok) {
          setLikes(prevLikes => prevLikes + 1);
          setIsLiked(true);
          localStorage.setItem(`isLiked-${post.post_id}`, "true");
        } 

          
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await fetch('/api/posts/like/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: currentUser.user_id, post_id: post.post_id }),
        });
        
        
        if (response.ok) {
         (likes !== 0) ? setLikes(prevLikes => prevLikes - 1) : setLikes(0);
          setIsLiked(false);
          localStorage.setItem(`isLiked-${post.post_id}`, "false");
        }         
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function handleComment(){
    
    try {
       
      const response = await fetch('/api/posts/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.user_id, post_id: post.post_id, content: commentContent }),
      });
      
      if (response.ok) {
        console.log('comment added');
      } 
        
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div className="flex flex-col bg-sky-500 rounded-md box-content p-4 shadow-md mb-5">

      <div className="flex flex-row justify-between">

        <div className="flex flex-row items-center">

          <img className="size-8 rounded-full mr-2" src="https://practicaltyping.com/wp-content/uploads/2019/06/Hinata.PNG.png" alt="profile" />

          <div className="flex flex-col items-start">
            <div className="font-semibold">{post.user_name}</div>
            <div className="static text-xs ">2d</div>
          </div>

        </div>
        <div className="cursor-pointer">...</div>
      </div>

      <div className="post-content">{post.post_content}</div>

      <div className="flex flex-row justify-between mt-2 mb-2">
        <div className="flex w-7 justify-between items-center">
          <AiOutlineLike className="bg-white rounded-full" />
          <div>{likes}</div>
        </div>
        <div>{comments.length} Comment(s)</div>
      </div>

      <hr />

      <div className="flex justify-evenly items-center mt-1 mb-1 box-content h-10">
        <div style={{ color: isLiked ? 'blue' : 'black' }} className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md cursor-pointer" onClick={handleLike}>Like</div>
        <div className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md cursor-pointer">Comment</div>
        <div className="flex justify-center items-center h-full w-1/3 hover:bg-sky-300 rounded-md cursor-pointer">Share</div>
      </div>

      <hr />

      <div className="lower-post-container">
        
        <div className="comment-section">
          {comments.map((comment) => {
            return <Comment key={comment.comment_post_id} comment={comment}/>
          })}
        </div>
        <form onSubmit={handleComment} className="add-comment">
          <img className="size-8 rounded-full mr-2" src="https://practicaltyping.com/wp-content/uploads/2019/06/Hinata.PNG.png" alt="profile" />
          <input type="text" placeholder="Write a public comment..." className="comment-entry" onChange={(e) => { setCommentContent(e.target.value) }}/>
        </form>
      </div>
    </div>
  );
}