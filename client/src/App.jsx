import React, { useEffect, useState } from "react";
import { Routes, Route}  from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import { CgProfile } from "react-icons/cg";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:user_id" element={<Profile />} />
    </Routes>
  );
}

export default App;