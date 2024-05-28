import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import CreatePostPopUp from "../components/CreatePostPopUp";
import Post from "../components/Post";
import FriendProfileDisplay from "../components/FriendProfileDisplay";
import ProfileFriendsTab from "../components/ProfileFriendsTab";
import UploadPictureDisplay from "../components/UploadPictureDisplay";
import EditProfilePopUp from "../components/EditProfilePopUp";
import { GiHouse } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import "../styles/Profile.css";




export default function Profile() {

  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [selectedUserFriends, setSelectedUserFriends] = useState([]);
  const [friendBtnText, setFriendBtnText] = useState("Add Friend");
  const [isFriend, setIsFriend] = useState(false);
  const [showFriendsTab, setShowFriendsTab] = useState(false);
  const [uploadPicture, setUploadPicture] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

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

  function isImage(file){
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  }

  function findFriend() {
     
    setIsFriend(false);
    for (let i = 0; i < selectedUserFriends.length; i++) {
      
      if (currentUser.user_id === selectedUserFriends[i].user_id) {
        setIsFriend(true);
        
      } else {
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
    setShowFriendsTab(false);
    navigateTo(`/user/${friendId}`);
  }

  async function toggleFriend() {
    
    if (!isFriend) {
      
      try {
        
        const response = await fetch('https://fakebook-server-omega.vercel.app/api/friend/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentUser: currentUser.user_id, selectedUser: selectedUser.user_id }),
        });

        if (response.ok) {
          setIsFriend(currentIsFriend => !currentIsFriend);
        }

      } catch (error) {
        console.error(error);
      }
    } else {
      
      try {
        
        const response = await fetch('https://fakebook-server-omega.vercel.app/api/friend/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentUser: currentUser.user_id, selectedUser: selectedUser.user_id }),
        });

        if (response.ok) {
          console.log('remove');
          setIsFriend(false);
        }

      } catch (error) {
        console.error(error);
      }

    }


  }

  function friendHoverText() { // work on pls
    setFriendBtnText("Remove?");
  }

  async function handlePostCreation(){
    setIsCreatePost(!isCreatePost);
  }

  // TODO: Change to only fetch posts from the users that is being access
  async function fetchPosts(){
    try{
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts');

      if(!response.ok){
        throw new Error('Network response was no ok');
      }

      const postData = await response.json();
      
      postData.sort((a, b) => new Date(b.post_age) - new Date(a.post_age));
      setUserPosts(postData);
      
    } catch (e){
      console.error("Error fetching: " + e);
    }

    
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
        handlePopUpClose();
      } else {
        console.log('oops');
      }
      
    } catch (error){
      console.error("SUCH DEVASTATION!!!!!: " + error);
    }
  }

  useEffect(() => {
    const fetchInitUserProfile = async () => {
       
      try {
        const response = await fetch(`https://fakebook-server-omega.vercel.app/api/user/profile/${user_id}`);

        if (response.ok) {
          console.log(`Retrieved ${user_id} from db`);

          const userFromDB = await response.json();
        
          setSelectedUser(userFromDB);
          setSelectedUserFriends(userFromDB.userFriends);
          findFriend();
          checkIfLoggedInUserProfile();
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchInitUserProfile();
  }, [selectedUser.user_id, user_id, isFriend]);


  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('https://fakebook-server-omega.vercel.app/api/posts');

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

  function handleEditProfile(){
    (editProfile) ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden';
    setEditProfile(!editProfile);
  }


  return (
    <div className="complete-container">
      <NavBar />
      <div className="full-profile-container">
        <div className="top-profile-container">
          <div className="cover-photo-container">
            <img className="cover-photo" src="/profile_pictures/bilbo_baggins_pfp_1.jpg" alt="cover" />
            {(isLoggedInUser) ? <button className="edit-cover-btn">Edit cover photo</button> : ""}
          </div>
          <div className="full-info-container">

            <div className="profile-info-container">
              <div className="inner-profile">

                <div className="profile-picture">
                  <img src={(selectedUser.pfp) ? selectedUser.pfp : "/profile_pictures/default_pfp.png"} alt="pfp" />

                  {(isLoggedInUser) ? 
                  <div className="upload-photo-container" onClick={() => {setUploadPicture(true)}}>
                    <FaCamera className="camera-icon" />
                  </div> : ""}

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

              {(isLoggedInUser) ? <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button> : <button className="add-friend-btn" onClick={toggleFriend}>{friendBtnText}</button>}

            </div>

          </div>

          <hr />
          <div className="tab-options">
            <div className="option" onClick={() => { setShowFriendsTab(false) }}>Posts</div>
            <div className="option">About</div>
            <div className="option" onClick={() => { setShowFriendsTab(true) }}>Friends</div>
            <div className="option">Photos</div>
          </div>
        </div>
        {(showFriendsTab) ? <ProfileFriendsTab friends={selectedUserFriends} toFriendProfile={toFriendProfile} currentUser={currentUser}/>
          : <div className="bottom-profile-container">
            <div className="lower-profile-info">
              <div className="intro-container">
                <h2>Intro</h2>
                <hr />
                <div className="intro-item">
                  <GiHouse />
                  <div className="lives-in-location">{`Lives in ${selectedUser.lives_in}`}</div>
                </div>
                <div className="intro-item">
                  <div className="lives-from-location">{`From ${selectedUser.hometown}`}</div>
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
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo-top-left" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo-top-right" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo-bottom-left" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo" />
                  <img src="/profile_pictures/default_pfp.png" alt="pic" className="display-photo-bottom-right" />
                </div>
              </div>

              <div className="friends-container">
                <div className="top-friends">
                  <div className="top-left-friends">
                    <h2>Friends</h2>
                    <div className="amount-of-friends">{`${selectedUserFriends.length} friend(s)`}</div>
                  </div>

                  <div className="see-all-container">
                    <button onClick={() =>{ setShowFriendsTab(true) }}>See all friends</button>
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

                {(isCreatePost) ? <CreatePostPopUp close={handlePostCreation} user={currentUser} updatePosts={updatePosts}/> : ""}
                <div className="users-posts">
                  {userPosts.map((post, i) => {
                    return <Post key={i} post={post} currentUser={currentUser} />
                  })}
                </div>
              </div> : <div className="no-post">{`${selectedUser.first_name} has not posted anything`}</div>}
          </div>}

      </div>
      {(uploadPicture) ? <UploadPictureDisplay setUploadPicture={setUploadPicture} isImage={isImage}/> : ""}
      {(editProfile) ? <EditProfilePopUp handleEditProfile={handleEditProfile} currentUser={currentUser}/> : ""}
    </div>

  );
}