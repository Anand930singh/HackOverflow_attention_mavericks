import React, { useState } from 'react';
import UserSignup from './UserSignup';
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleShowSignup = () => {
    setShowSignup(true); 
    setShowLogin(false); 
    
  };

  const handelUserLogin=async()=>{
    const response= await fetch('http://localhost:8050/auth/signin',{
      method:"POST",
      body:JSON.stringify({
        formData
      }),
      headers:{"Content-type":"application/json"},
    })
    const json=await response.json();
    if(json)
    {
      const userData = { userId: json.data.userId, type: json.data.type };
      localStorage.setItem('userData',JSON.stringify(userData))
      navigate('/home');
    }
  }

  return (
    <div className="form-container">
      {showLogin && (
        <>
          <h2>User Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" onClick={(e)=>handelUserLogin(e.target.value)}>Login</button>
          </form>
          <h4>Don't have an account? <button onClick={handleShowSignup}>Signup Here</button></h4>
        </>
      )} 
      {showSignup && <UserSignup />}
    </div>
  );
}
export default UserLogin;
