import React, { useEffect, useState, createContext } from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import CreatePostPopUp from "../components/CreatePostPopUp";
import ProfileHoverPopUp from "../components/ProfileHoverPopUp";
import "../styles/Home.css";

export const UserContext = createContext();

export default function Home(){
  
  const [posts, setPosts] = useState([]);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const fetchCurrentUser = () => {
      const loggedInUser = localStorage.getItem('currentUser');
      
      if(loggedInUser !== null){
        const foundUser = JSON.parse(loggedInUser);
        console.log(foundUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
        setCurrentUser(null);
      }
    }
    fetchCurrentUser();
  },[]);

  
  async function fetchPosts(){
    try{
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts');

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
  }, []); // remove if things are wonky

  async function handlePostCreation(){
    setIsCreatePost(!isCreatePost);
  }


  async function updatePosts(newPost){
    try{
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
      });
      
      if(response.ok){
        console.log('ok');
        fetchPosts();
      } else {
        console.log('oops');
      }
      
    } catch (error){
      console.error("SUCH DEVASTATION!!!!!: " + error);
    }
  }

  
  
  return (currentUser) ? (
    <div className="static h-[100%]">
      <UserContext.Provider value={currentUser}>
        <NavBar currentUser={currentUser}/>
      
        <div className="relative flex flex-col w-[600px] h-full mx-auto top-20 box-content">
          <CreatePost handlePostCreation={handlePostCreation} user={currentUser}/>
          <div className="flex flex-col mt-10">
            {posts.map((post) =>{
              return <Post key={post.post_id} post={post} currentUser={currentUser}/>;
            })}
          </div>
          
        </div>
      
        {(isCreatePost) ? <CreatePostPopUp close={handlePostCreation} user={currentUser} updatePosts={updatePosts}/> : ""}
    
      
        </UserContext.Provider>
    </div>
    
  ) : "no currentUser, please log in";
}