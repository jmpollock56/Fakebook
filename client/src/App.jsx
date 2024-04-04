import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        console.log(data);
      }
    ).catch(error => console.error('Error fetching data:', error));
  }, [])



  return (
    <div className="home-container">

      <div className="main-container">

        <div className="left-container">
          <h1 className="logo">fakebook</h1>
          <h2 className="lower-logo">Connect with friends and the world around you on Fakebook</h2>
        </div>

        <div className="right-container">
          <div className="main-right-container">

            <form action="" method="post">
              <input className="login-field" type="text" name="emailOrPhone" placeholder="Email or phone number" />
              <input className="login-field" type="password" name="password" id="password" placeholder="Password" />
              <input type="submit" value="Log In" className="submit-login" />

              <a className="forgot-password" href="#">Forgot password?</a>
            </form>

            <hr />

            <div className="create-container">
              <button className="create-new-account"><b>Create new account</b></button>
            </div>
          
          </div>
          <div className="create-page-container">
            <div className="create-a-page"><b>Create a Page</b> for a celebrity, brand or business.</div>
          </div>
          
        </div>
        
      </div>





    </div>
  );
}

export default App;