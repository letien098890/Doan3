import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input type="email" placeholder="Email" autoComplete="nope" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <a href="#" className="link">
            Forgot Your Password?
          </a>
        </div>
        <div className="action">
          <button>Register</button>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
