import React, { useState } from "react";
import "./Login.css";

function StudentLogin({ handleLogin, handleLogout, setloid }) {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const check = () => {
    const slicedString = id.slice(-4);
    if (password === slicedString) {
      setLoggedIn(true);
      handleLogin(id);
      setloid(id);
    }
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
    handleLogout();
  };

  return (
    <div className="login-card">
      <h2>Student Login</h2>
      <h3>Enter your credentials</h3>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        {loggedIn ? (
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        ) : (
          <button type="submit" onClick={check}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default StudentLogin;
