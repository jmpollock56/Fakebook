import React from "react";
import "../styles/EditProfilePopUp.css";

export default function EditProfilePopUp({ handleEditProfile, currentUser }) {

  function handleEditBio() {
    alert('edit');
  }

  return (
    <div className="popup-background">
      <div className="edit-main">

        <div className="edit-top">
          <div className="title">Edit profile</div>
          <a href="#" onClick={handleEditProfile}><img src="/close-it.png" alt="close" className="close-btn" /></a>
        </div>

        <hr />

        <div className="edit-bottom">
          <div className="edit-section">
            <div className="section-top">
              <div className="edit-title">Profile picture</div>
              <a href="">Edit</a>
            </div>

            <div className="section-bottom">
              <img src={(currentUser.pfp) ? currentUser.pfp : "/profile_pictures/default_pfp.png"} alt="pfp" className="current-pfp" />
            </div>
          </div>

          <div className="edit-section">
            <div className="section-top">
              <div className="edit-title">Cover Photo</div>
              <a href="">Edit</a>
            </div>

            <div className="section-bottom">
              <img src="/profile_pictures/bilbo_baggins_pfp_1.jpg" alt="cover" className="current-cover" />
            </div>
          </div>

          <div className="edit-section">
            <div className="section-top-top">
              <div className="section-top">
                <div className="edit-title">Avatar</div>
                <a href="#">Create</a>
              </div>
              <p className="avatar-text">Only you can view this section</p>
            </div>

            <div className="section-bottom">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/enZUKz52EYQ.png" alt="cover" className="current-cover" />
              <p className="avatar-text">Express yourself using an avatar</p>
              <button className="create-avatar">Create avatar</button>
            </div>
          </div>

          <div className="edit-section">
            <div className="section-top">
              <div className="edit-title">Bio</div>
              <a href="#" onClick={handleEditBio}>Add</a>
            </div>
            <div className="section-bottom-bio">
              <input type="text" name="bio" id="bio" disabled placeholder="Describe yourself..." />
            </div>
          </div>

          <div className="edit-section">
            <div className="section-top">
              <div className="edit-title">Customize your intro</div>
              <a href="#">Edit</a>
            </div>

          </div>

          <div className="section-bottom">
            <div className="intro-element">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="icon" />
            </div>
          </div>
        </div>
      </div>


    </div>
    
  );
}