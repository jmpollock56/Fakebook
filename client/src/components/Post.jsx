import React, { useEffect, useState, useRef } from "react";
import Comment from "./Comment";
import ProfileHoverPopUp from "./ProfileHoverPopUp";
import { useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiLock, BiLogIn } from "react-icons/bi";

import "../styles/post.css";

export default function Post({ post, currentUser }) {

  const [isLiked, setIsLiked] = useState(localStorage.getItem(`isLiked-${post.post_id}`) === "true" ? true : false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [postAge, setPostAge] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false)

  const navigateTo = useNavigate();
  const commentInputRef = useRef(null);

  useEffect(() => { //checks if currentUser has liked post
    for (let i = 0; i < currentUser.userLikes.length; i++) {
      if (post.post_id === currentUser.userLikes[i].likes_post_id) {
        setIsLiked(true);
        localStorage.setItem(`isLiked-${post.post_id}`, "true");
        return;
      }
    }

  }, []);

  useEffect(() => {
    createPostAge();
  });

  useEffect(() => {
    const fetchComments = async () => {
      try{
        const response = await fetch(`https://fakebook-server-omega.vercel.app/api/posts/comments/${post.post_id}`);
        
        if(response.ok){
          const postComments = await response.json();
          setComments(postComments.comments);
        }
      } catch(error) {
        console.error("Error fetching: " + error);
      }
    }
    fetchComments();
  }, [post.post_id, comments]);

  async function handleLike() {
    if (!isLiked) {
      try {

        const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts/like/add', {
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
        const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts/like/remove', {
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

  async function handleComment(event) {
    event.preventDefault();
    
    try {

      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.user_id, post_id: post.post_id, content: commentContent }),
      });

      if (response.ok) {
        console.log('comment added');
        setCommentContent("");
        
      } else {
        console.log(response);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  function createPostAge() {
    
      let now = new Date();
      let postDate = new Date(post.post_age);
      let timeDiff = now.getTime() - postDate.getTime();
      let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      let hoursDiff = Math.floor(timeDiff / (1000 * 3600));
      let minutesDiff = Math.floor(timeDiff / (1000 * 60));


      if (daysDiff > 0) {
        let age = `${daysDiff}d`;
        setPostAge(age);
      } else if (hoursDiff > 0) {
          let age = `${hoursDiff}h`;
          setPostAge(age);
      } else {
          let age = `${minutesDiff}m`;
          setPostAge(age);
      }
    
   }
    

  function goToProfile(){
    navigateTo(`/user/${post.user_id}`);
  }

  function scrollToComment(){
    commentInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    commentInputRef.current.focus();
  }

  
  return (
    
      <div className="flex flex-col bg-white rounded-md box-content p-4 shadow-md mb-5">

        <div className="flex flex-row justify-between">

          <div className="flex flex-row items-center" onClick={goToProfile}>

            <img className="size-8 rounded-full mr-2 cursor-pointer" src={(post.user_pfp) ? post.user_pfp : "/profile_pictures/default_pfp.png"} alt="profile" />

            <div className="flex flex-col items-start cursor-pointer" >
              <div className="font-semibold">{post.user_name}</div>
              <div className="static text-xs ">{postAge}</div>
            </div>

          </div>
          <div className="cursor-pointer">...</div>
        </div>
        <div className="post-content-container">
          <div className="post-content">{post.post_content}</div>
        </div>


        <div className="flex flex-row justify-between mt-2 mb-2">
          <div className="flex w-7 justify-between items-center">
            <AiOutlineLike className="rounded-full" />
            <div>{likes}</div>
          </div>
          <div>{comments.length} Comment(s)</div>
        </div>

        <hr />

        <div className="flex justify-evenly items-center mt-1 mb-1 box-content h-10">
          <div style={{ color: isLiked ? 'blue' : 'black' }} className="flex justify-center items-center h-full w-1/3 hover:bg-[#dfe3ee] rounded-md cursor-pointer" onClick={handleLike}>Like</div>
          <div onClick={scrollToComment} className="flex justify-center items-center h-full w-1/3 hover:bg-[#dfe3ee] rounded-md cursor-pointer">Comment</div>
          <div className="flex justify-center items-center h-full w-1/3 hover:bg-[#dfe3ee] rounded-md cursor-pointer">Share</div>
        </div>

        <hr />

        <div className="lower-post-container">

          <div className="comment-section">
            {comments.map((comment, i) => {
              return <Comment key={i} comment={comment} />
            })}
          </div>
          <form onSubmit={handleComment} className="add-comment">
            <img className="size-8 rounded-full mr-2" src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="profile" />
            <input ref={commentInputRef} type="text" placeholder="Write a public comment..." className="comment-entry" onChange={(e) => { setCommentContent(e.target.value) }} />
          </form>
        </div>
      </div>
    

  );
}