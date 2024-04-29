import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import CreatePostPopUp from "../components/CreatePostPopUp";
import Post from "../components/Post";
import FriendProfileDisplay from "../components/FriendProfileDisplay";
import { GiHouse } from "react-icons/gi";
import "../styles/Profile.css";


export default function Profile() {

  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

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

  useEffect(() => {
    const fetchUserPosts = async () => {
      try{
        const response = await fetch('/api/posts');
  
        if(!response.ok){
          throw new Error('Network response was no ok');
        }
  
        const postData = await response.json();
        const posts = postData.filter((post) => post.user_id === currentUser.user_id);
        posts.sort((a, b) => new Date(b.post_age) - new Date(a.post_age));
        
        setUserPosts(posts);
        
      } catch (e){
        console.error("Error fetching: " + e);
      }
    }

    fetchUserPosts();
  })

  function handlePostCreation(){
    setIsCreatePost(!isCreatePost);
  }

  console.log(currentUser.first_name);
  return (
    <div className="complete-container">
      <NavBar />
      <div className="full-profile-container">
        <div className="top-profile-container">
          <div className="cover-photo-container">
            <button className="edit-cover-btn">Edit cover photo</button>
          </div>
          <div className="full-info-container">

            <div className="profile-info-container">
              <div className="inner-profile">
                <div className="profile-picture">
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                </div>

                <div className="name-and-friends-container">
                  <div className="name-container">
                    <div className="name">{`${currentUser.first_name} ${currentUser.last_name}`}</div>
                    <div className="friends">90 friends</div>
                  </div>

                  <div className="friend-icons-container">
                    <div className="friend-circle">
                      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                    </div>
                    <div className="friend-circle">
                      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                    </div>
                    <div className="friend-circle">
                      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                    </div>
                    <div className="friend-circle">
                      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                    </div>
                    <div className="friend-circle">
                      <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                    </div>
                  </div>

                </div>
              </div>

              <button className="edit-profile-btn">Edit Profile</button>

            </div>

          </div>

          <hr />
          <div className="tab-options">
            <div className="option">Posts</div>
            <div className="option">About</div>
            <div className="option">Friends</div>
            <div className="option">Photos</div>
          </div>
        </div>

        <div className="bottom-profile-container">
          <div className="lower-profile-info">
            <div className="intro-container">
              <h2>Intro</h2>
              <hr />
              <div className="intro-item">
              <GiHouse />
                <div className="lives-in-location">Lives in Charlotte, North Carolina</div>
              </div>
              <div className="intro-item">
                <div className="lives-from-location">From Leesburg, Georgia</div>
              </div>
              <div className="intro-item">
                
                <div className="joined-location">Joined in 2024</div>
              </div>

            </div>
            <div className="photos-container">
              <div className="top-photos">
                <h2>Photos</h2>
                <button className="see-all-photos-btn">See all photos</button>
              </div> 
              <div className="photo-display-container">
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-top-left"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-top-right"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-bottom-left"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo"/>
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-bottom-right"/>
              </div>
            </div>

            <div className="friends-container">
              <div className="top-friends">
                <div className="top-left-friends">
                  <h2>Friends</h2>
                  <div className="amount-of-friends">91 friends</div>
                </div>

                <div className="see-all-container">
                  <button>See all friends</button>
                </div>
                
              </div>

              <div className="friend-main-container">
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
                <FriendProfileDisplay />
              </div>
            </div>
          </div>

          <div className="profile-post-feed">
            <CreatePost handlePostCreation={handlePostCreation} user={currentUser}/>
            <br />
            {(isCreatePost) ? <CreatePostPopUp close={handlePostCreation} user={currentUser}/> : ""}
            <div className="users-posts">
              {userPosts.map((post, i) => {
                return <Post key={i} post={post} currentUser={currentUser}/>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}