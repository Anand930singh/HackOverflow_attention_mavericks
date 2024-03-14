// App.js
import React, { useState } from 'react';
import './LoginSignup.css';
import UserSignup from './UserSignup';
import AdminSignup from './AdminSignup';


function LoginSignup() {
  const [userMode, setUserMode] = useState(true); 
  return (
    <div className="LoginSignup">
      <div className="switch-mode">
        <button onClick={() => setUserMode(true)}>User Mode</button>
        <button onClick={() => setUserMode(false)}>Admin Mode</button>
      </div>
      {userMode ? (
        <>
          <UserSignup />
        </>
      ) : (
        <>
          <AdminSignup />
        </>
      )}
    </div>
  );
}

export default LoginSignup;
