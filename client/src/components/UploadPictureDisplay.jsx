import React, { useRef } from "react";
import "../styles/UploadPictureDisplay.css";

export default function UploadPictureDisplay({ setUploadPicture, isImage }){

  const fileInputRef = useRef(null);

  async function uploadPhoto(file){
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    try{
      const response = await fetch('http://localhost:3000/api/photo/upload', {
        method: 'POST',
        body: formData  
      });

      if(response.ok){
        console.log('Photo Uploaded');
      } else {
        console.log(response.statusText);
      }

    } catch {
      console.error(error);
    }
  }

  function handleFileUpload(event){
    const file = event.target.files[0];

    if(isImage(file)){
      console.log("selected file: ", file);
      uploadPhoto(file);
    } else {
      console.log("Not a photo");
    }
    
  }



  return (
    <div className="upload-background">

      <div className="upload-main-container">
        <div className="upload-top">
          <h1>Choose profile picture</h1>
          <a href="#" onClick={(e) => {e.preventDefault; setUploadPicture(false);}}><img src="/close-it.png" alt="close" /></a>
        </div>

        <hr />

        <div className="user-upload">
          <input 
          ref={fileInputRef}
          type="file"
          style={{display: "none"}}
          onChange={handleFileUpload}/>

          <button onClick={() => {fileInputRef.current.click()}}>Upload photo</button>
        </div>

        <div className="uploaded-photos">
          <h1>Uploads</h1>
          <div className="uploaded-photos-container">
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
            <img src="/profile_pictures/default_pfp.png" alt="photo" />
          </div>
         
        </div>
      </div>
    </div>
  );
}