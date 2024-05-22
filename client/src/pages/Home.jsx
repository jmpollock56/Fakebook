import React, { useEffect, useState, createContext } from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import CreatePostPopUp from "../components/CreatePostPopUp";
import ProfileHoverPopUp from "../components/ProfileHoverPopUp";
import "../styles/Home.css";

export const UserContext = createContext();

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const fetchCurrentUser = () => {
      const loggedInUser = localStorage.getItem('currentUser');

      if (loggedInUser !== null) {
        const foundUser = JSON.parse(loggedInUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
        setCurrentUser(null);
      }
    }
    fetchCurrentUser();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts');

      if (!response.ok) {
        throw new Error('Network response was no ok');
      }

      const postData = await response.json();

      postData.sort((a, b) => new Date(b.post_age) - new Date(a.post_age));
      setPosts(postData);

    } catch (e) {
      console.error("Error fetching: " + e);
    }


  }

  useEffect(() => {
    fetchPosts();
  }, []); // remove if things are wonky

  async function handlePostCreation() {
    setIsCreatePost(!isCreatePost);
  }

  async function updatePosts(newPost) {
    try {
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        console.log('ok');
        fetchPosts();
      } else {
        console.log('oops');
      }

    } catch (error) {
      console.error("SUCH DEVASTATION!!!!!: " + error);
    }
  }



  return (currentUser) ? (
    <div className="static h-[100%]">
      <UserContext.Provider value={currentUser}>
        <NavBar currentUser={currentUser} />

        <div className="main-home">

          <div className="left-sidebar">
            <div className="sidebar-option">
              <img src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="" />
              <div className="sidebar-title">{`${currentUser.first_name} ${currentUser.last_name}`}</div>
            </div>
            <div className="sidebar-option">
              <img src="/friend.png" alt="friends" />
              <div className="sidebar-title">Friends</div>
            </div>
            <div className="sidebar-option">
              <img src="/memories.png" alt="" />
              <div className="sidebar-title">Memories</div>
            </div>
            <div className="sidebar-option">
              <img src="/saved.png" alt="" />
              <div className="sidebar-title">Saved</div>
            </div>
            <div className="sidebar-option">
              <img src="/video.png" alt="" />
              <div className="sidebar-title">Video</div>
            </div>
            <div className="sidebar-option">
              <img src="/marketplace.png" alt="" />
              <div className="sidebar-title">Marketplace</div>
            </div>
          </div>

          <div className="relative flex flex-col w-[80%] min-w-96 max-w-2xl h-full ml-[34%] top-20 box-content">
            <CreatePost handlePostCreation={handlePostCreation} user={currentUser} />
            <div className="flex flex-col mt-10">
              {posts.map((post) => {
                return <Post key={post.post_id} post={post} currentUser={currentUser} />;
              })}
            </div>

          </div>

        </div>



        {(isCreatePost) ? <CreatePostPopUp close={handlePostCreation} user={currentUser} updatePosts={updatePosts} /> : ""}


      </UserContext.Provider>
    </div>

  ) : "no currentUser, please log in";
}