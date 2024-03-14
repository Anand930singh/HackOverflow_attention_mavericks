// AdminSignup.js
import React, { useState } from 'react';
import './AdminSignup.css'
import AdminLogin from './AdminLogin';

function AdminSignup() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(true);  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false); 
  };

  return (
    <div className="form-container">
      {showSignup && (
        <>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
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
        <button type="submit">Sign Up</button>
      </form>
      <h4>Already have an account? <button onClick={handleShowLogin}>Login Here</button></h4>
      </>
      )}
      {showLogin && <AdminLogin />}
    </div>
  );
}

export default AdminSignup;
