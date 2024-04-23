import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import CreatePostPopUp from "../components/CreatePostPopUp";




export default function Home(){
  
  const [posts, setPosts] = useState([]);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = () => {
      const loggedInUser = localStorage.getItem('currentUser');
      
      if(loggedInUser !== null){
        const foundUser = JSON.parse(loggedInUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
      }
    }
    fetchCurrentUser();
  },[]);

  async function fetchPosts(){
    try{
      const response = await fetch('/api/posts');

      if(!response.ok){
        throw new Error('Network response was no ok');
      }

      const postData = await response.json();
      
      postData.sort((a, b) => new Date(b.post_age) - new Date(a.post_age));
      setPosts(postData);
      
    } catch (e){
      console.error("Error fetching: " + e);
    }

    
  } 
  
  useEffect(() => {
    fetchPosts();
  }, []);

  async function handlePostCreation(){
    setIsCreatePost(true);
  }

  function handlePopUpClose(){
    setIsCreatePost(false);
  }

  async function updatePosts(newPost){
    try{
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
      });
      
      if(response.ok){
        console.log('ok');
        fetchPosts();
        handlePopUpClose();
      } else {
        console.log('oops');
      }
      
    } catch (error){
      console.error("SUCH DEVASTATION!!!!!: " + error);
    }
  }


  
  return (
    <div className="static h-[100vh]">
      <NavBar />
      <div className="relative flex flex-col w-[600px] h-full mx-auto top-20 box-content">
        <CreatePost handlePostCreation={handlePostCreation} user={currentUser}/>
        <div className="flex flex-col mt-10">
          {posts.map((post) =>{
            return <Post key={post.post_id} post={post} currentUser={currentUser}/>;
          })}
        </div>
        
      </div>
      {(isCreatePost) ? <CreatePostPopUp close={handlePopUpClose} user={currentUser} updatePosts={updatePosts}/> : ""}
      
    </div>
  );
}