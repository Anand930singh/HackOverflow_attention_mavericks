
import React, { useState } from 'react';
import './UserSignup.css';
import UserLogin from './UserLogin';

function UserSignup() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);  
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    type:0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  const handleShowLogin = () => {
    setShowSignup(false); 
    setShowLogin(true);
  };

  const handelUserSignup=async()=>{
    const response= await fetch('http://localhost:8050/auth/signup',{
      method:"POST",
      body:JSON.stringify({
        formData
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
      console.log(json);
    }
  }

  return (
    <div className="form-container">
      {showSignup && (
        <>
          <h2>User Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" onClick={(e)=>handelUserSignup(e.target.value)}>Sign Up</button>
          </form>
          
          <h4>Already have an account? <button onClick={handleShowLogin}>Login Here</button></h4>
          
        </>
      )}
      {showLogin && <UserLogin />}
    </div>
  );
}
export default UserSignup;
