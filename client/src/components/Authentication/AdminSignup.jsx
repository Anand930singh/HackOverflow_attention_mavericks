// AdminSignup.js
import React, { useState } from 'react';
import './AdminSignup.css'
import AdminLogin from './AdminLogin';

function AdminSignup() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    password: '',
    type: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handelAdminSignup = async () => {
    const response = await fetch('http://localhost:8050/auth/signup', {
      method: "POST",
      body: JSON.stringify({
        formData
      }),
      headers: { "Content-type": "application/json" },
    })
    const json = await response.json();
    if (json) {
      console.log(json);
    }
  }

  return (
    <div className="form-container">
      {showSignup && (
        <>
          <h2>Admin Signup</h2>
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
            <button type="submit" onClick={(e) => handelAdminSignup(e.target.value)}>Sign Up</button>
          </form>
          <h4>Already have an account? <button onClick={handleShowLogin}>Login Here</button></h4>
        </>
      )}
      {showLogin && <AdminLogin />}
    </div>
  );
}

export default AdminSignup;
