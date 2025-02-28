import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate=useNavigate();

  useEffect(() => {
      const loggedInUser= JSON.parse(localStorage.getItem("loggedInUser"));
      console.log(loggedInUser)
      if (loggedInUser){
        setUser(loggedInUser)
      }
  })
  return (
    <div className="account-container">
      <h2>Account</h2>
      {user ? (
          <>
            <p><strong>Name:Sudha</strong> {user.name}</p>
            <p><strong>Email:sudha@gmail.com</strong> {user.email}</p>
           </> 
      ):(
        <p>Loading user details...</p>
      )
    }
    </div>
  );
};

export default Account;
