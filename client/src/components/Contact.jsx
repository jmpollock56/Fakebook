import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Contact({ friend }){
  const navigateTo = useNavigate();

  return(
    <div className="contact-option" onClick={() => {navigateTo(`/user/${friend.user_id}`)}}>
      <img src="/profile_pictures/default_pfp.png" alt="pfp" />
      <div className="contact-name">{friend.name}</div>
    </div>
  );
}