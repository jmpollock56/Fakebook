import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import CreateAccountPop from "../components/CreateAccountPop";
import "../styles/App.css";



export default function Login() {
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  
  const navigateTo = useNavigate();

  async function handleSubmit(e){
    localStorage.clear();
    e.preventDefault();
    
    try{
      const response = await fetch('https://fakebook-server-omega.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password }),
      });
      
    
      if (response.ok){    
        const data = await response.json();
        setCurrentUser(data.currentUser);
        localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
        
        console.log('success');

        navigateTo('/home');
      } else { 
        alert('no');
        console.error('failed');
      }
    }catch (error){
      console.error('error', error);
    }
    
  }

  async function handleCreateAccount(){
    setIsCreateAccount(true);
  }

  function handlePopUpClose(){
    setIsCreateAccount(false);
  }

    
  return (
    <div className="home-container">

      <div className="main-container">

        <div className="left-container">
          <h1 className="logo">fakebook</h1>
          <h2 className="lower-logo">Connect with friends and the world around you on Fakebook</h2>
        </div>

        <div className="right-container">
          <div className="main-right-container">

            <form onSubmit={handleSubmit}>
              <input 
              className="login-field" 
              type="text" 
              name="emailOrPhone" 
              placeholder="Email or phone number" 
              value={emailOrPhone}
              onChange={(e) => {setEmailOrPhone(e.target.value)}}/>

              <input 
              className="login-field" 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}/>

              <input type="submit" value="Log In" className="submit-login" />

              <a className="forgot-password" href="#">Forgot password?</a>
            </form>

            <hr />

            <div className="create-container">
              <button className="create-new-account" onClick={handleCreateAccount}>Create new account</button>
            </div>
          
          </div>
          <div className="create-page-container">
            <div className="create-a-page" ><b>Create a Page</b> for a celebrity, brand or business.</div>
          </div>
          
        </div>
        
      </div>


      {(isCreateAccount) ? <CreateAccountPop closeCreate={handlePopUpClose}/> : ""}


    </div>
  );
}