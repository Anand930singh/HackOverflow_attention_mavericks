
import React, { useState } from 'react';
import UserSignup from './UserSignup';

function UserLogin() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
            <button type="submit">Login</button>
          </form>
          <h4>Don't have an account? <button onClick={handleShowSignup}>Signup Here</button></h4>
        </>
      )} 
      {showSignup && <UserSignup />}
    </div>
  );
}
export default UserLogin;
