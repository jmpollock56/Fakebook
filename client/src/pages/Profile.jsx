import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import CreatePostPopUp from "../components/CreatePostPopUp";
import Post from "../components/Post";
import FriendProfileDisplay from "../components/FriendProfileDisplay";
import { GiHouse } from "react-icons/gi";
import "../styles/Profile.css";
import { useNavigate, useParams } from "react-router-dom";


export default function Profile() {

  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [selectedUserFriends, setSelectedUserFriends] = useState([]);
  const [friendBtnText, setFriendBtnText] = useState("Add Friend");
  const [isFriend, setIsFriend] = useState(false);

  const { user_id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = () => {

      const loggedInUser = localStorage.getItem('currentUser');

      if (loggedInUser !== null) {
        const foundUser = JSON.parse(loggedInUser);
        setCurrentUser(foundUser);
      } else {
        console.log("loggedInUser in null!!!!");
      }
    }
    fetchCurrentUser();

  }, []);

  function findFriend() {
   console.log(selectedUserFriends);
    for (let i = 0; i < selectedUserFriends.length; i++) {
      
      if (currentUser.user_id === selectedUserFriends[i].user_id) {
        console.log("findFriend --- setting to true");
        setIsFriend(true);

      } else {
        console.log("findFriend --- setting to false");
        setIsFriend(false);
      }

    }
    
    if (!isFriend) {
      setFriendBtnText("Add Friend");
     
    } else {
      setFriendBtnText("Friends!");

    }
  }

  function checkIfLoggedInUserProfile() { 
    if (selectedUser.user_id === currentUser.user_id) {
      setIsLoggedInUser(true);

    } else {
      setIsLoggedInUser(false);
    }
  }

  async function toFriendProfile(friendId) {
    navigateTo(`/user/${friendId}`);
  }

  async function toggleFriend() {
  console.log(isFriend + "before fully running toggleFriend");
    if(!isFriend){
      try {

        const response = await fetch('/api/friend/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({currentUser: currentUser.user_id, selectedUser: selectedUser.user_id }),
        });
  
        if(response.ok){
          console.log(isFriend + " --Before setting friend to true from false");
          setIsFriend(currentIsFriend => !currentIsFriend);
         
        }
        
      } catch (error) {
        console.error(error);
      }
  } else {
    try{

      const response = await fetch('/api/friend/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({currentUser: currentUser.user_id, selectedUser: selectedUser.user_id }),
      });

      if(response.ok){
        console.log(isFriend + " --Before setting friend to false from true");
        setIsFriend(currentIsFriend => !currentIsFriend);
      }
      
    } catch (error){
      console.error(error); 
    }
    
  }

  console.log(isFriend + "after fully running toggleFriend");
}

  function friendHoverText(){ // work on pls
    setFriendBtnText("Remove?");
  }

  useEffect(() => {
    const fetchInitUserProfile = async () => {
      console.log('fetchInitUserProfile');
      try {
        const response = await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user_id })
        });

        if (response.ok) {
          console.log(`Retrieved ${user_id} from db`);

          const userProfileData = await response.json();
          const userFromDB = userProfileData.selectedUser;
  
  
          setSelectedUser(userFromDB);
          setSelectedUserFriends(userFromDB.userFriends);

          
          findFriend();
          checkIfLoggedInUserProfile();
          console.log(isFriend + " in respon fetchUserProfile");
        }
        console.log(isFriend + " during fetchUserProfile");
       
      } catch (error) {
        console.error('error retrieving user profile info');
      }
    }
    fetchInitUserProfile();
  }, [selectedUser.user_id, user_id, isFriend]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (!response.ok) {
          throw new Error('Network response was no ok');
        }

        const postData = await response.json();
        const posts = postData.filter((post) => post.user_id === selectedUser.user_id);
        posts.sort((a, b) => new Date(b.post_age) - new Date(a.post_age));

        setUserPosts(posts);

      } catch (e) {
        console.error("Error fetching: " + e);
      }
    }

    fetchUserPosts();

  }, [selectedUser.user_id])

  function handlePostCreation() {
    setIsCreatePost(!isCreatePost);
  }

  return (
    <div className="complete-container">
      <NavBar />
      <div className="full-profile-container">
        <div className="top-profile-container">
          <div className="cover-photo-container">
            {(isLoggedInUser) ? <button className="edit-cover-btn">Edit cover photo</button> : ""}
          </div>
          <div className="full-info-container">

            <div className="profile-info-container">
              <div className="inner-profile">
                <div className="profile-picture">
                  <img src="https://i.stack.imgur.com/l60Hf.png" alt="pfp" />
                </div>

                <div className="name-and-friends-container">
                  <div className="name-container">
                    <div className="name">{`${selectedUser.first_name} ${selectedUser.last_name}`}</div>
                    <div className="friends">{(selectedUserFriends) ? selectedUserFriends.length : "0"} friends</div>
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

              {(isLoggedInUser) ? <button className="edit-profile-btn">Edit Profile</button> : <button className="add-friend-btn" onClick={toggleFriend}>{friendBtnText}</button>}

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
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-top-left" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-top-right" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-bottom-left" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo" />
                <img src="https://i.stack.imgur.com/l60Hf.png" alt="pic" className="display-photo-bottom-right" />
              </div>
            </div>

            <div className="friends-container">
              <div className="top-friends">
                <div className="top-left-friends">
                  <h2>Friends</h2>
                  <div className="amount-of-friends">{`${selectedUserFriends.length} friends`}</div>
                </div>

                <div className="see-all-container">
                  <button>See all friends</button>
                </div>

              </div>

              <div className="friend-main-container">

                {selectedUserFriends.map((friend, i) => {
                  if (i < 9) {
                    return <FriendProfileDisplay
                      key={i}
                      friend={friend}
                      setSelectedUser={setSelectedUser}
                      toFriendProfile={() => { toFriendProfile(friend.user_id) }} />
                  }

                })}
              </div>
            </div>
          </div>

          {(userPosts.length > 0) ?
            <div className="profile-post-feed">

              {(isLoggedInUser) ? <><CreatePost handlePostCreation={handlePostCreation} user={currentUser} /> <br /></> : ""}

              {(isCreatePost) ? <CreatePostPopUp close={handlePostCreation} user={currentUser} /> : ""}
              <div className="users-posts">
                {userPosts.map((post, i) => {
                  return <Post key={i} post={post} currentUser={currentUser} />
                })}
              </div>
            </div> : <div className="no-post">{`${selectedUser.first_name} has not posted anything`}</div>}
        </div>
      </div>
    </div>

  );
}