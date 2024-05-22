import React from 'react';


export default function Contact({ friend }){
  return(
    <div className="contact-option">
      <img src="/profile_pictures/default_pfp.png" alt="" />
      <div className="contact-name">{friend}</div>
    </div>
  );
}