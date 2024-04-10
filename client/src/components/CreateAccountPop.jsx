import React, { useState } from "react";
import "../popup.css";

export default function CreateAccountPop() {

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdayMonth, setBirthdayMonth] = useState(0);
  const [birthdayDay, setBirthdayDay] = useState(0);
  const [birthdayYear, setBirthdayYear] = useState(0);
  const [gender, setGender] = useState('');

  const months = [{days: 31, name: 'Jan'}, {days: 28, name: 'Feb'}, {days: 31, name: 'Mar'}, {days: 30, name: 'Apr'}, {days: 31, name: 'May'},
                  {days: 30, name: 'Jun'}, {days: 31, name: 'Jul'}, {days: 30, name: 'Aug'},{days: 31, name: 'Sep'},{days: 30, name: 'Oct'},{days: 31, name: 'Nov'}, 
                  {days: 30, name: 'Dec'}];
  

  return (
    <div className="popup-container" >

      <div className="top">

        <div className="top-left">
          <h2>Sign up</h2>
          <p>It's quick and easy.</p>
        </div>

        <div className="top-right">
          <a href="#">x</a>
        </div>

      </div>

      <hr />

      <div className="create-form-container">
        <form action="" method="post">
          <div className="form-name-container">
            <input type="text" placeholder="First Name" className="name-in"/>
            <input type="text" placeholder="Last Name" className="name-in" />
          </div>
          <div className="form-other-container">
            <input type="text" placeholder="Mobile daysber or email"/>
            <input type="password" placeholder=" New password"/>
          </div>
          <div className="birthday-select">
            <select className="month" onChange={(e) => {setBirthdayMonth(e.target.value)}}>
              {months.map((month) => {
                return <option value="{month.num}">{month.name}</option>;
              })}
              
            </select>
            <select className="day">
              {}
            </select>
            <select className="year"></select>
          </div>
          
        </form>
      </div>

      

    </div >
  );
}