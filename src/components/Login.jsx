import "./Login.css";
import { useState } from "react";

function Login({ handleLogin, isLoggedIn }) {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState(isLoggedIn);

  const handleLoginClick = () => {
    const log = {
      id: "ashok",
      pwd: "123",
    };

    if (id === log.id && password === log.pwd) {
      setstatus(true);
      handleLogin(status);
      localStorage.setItem("isLoggedIn", "true");
    }
  };

  const handleLogoutClick = () => {
    setstatus(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <h3>Enter your credentials</h3>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setid(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        {isLoggedIn ? (
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        ) : (
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
      {isLoggedIn && (
        <div className="logout-section">
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
