import React, { useState } from "react";
import "./LoginApp.css";
import FormInput from "./FromInput";
import { Link } from "react-router-dom";
import Logo from "./Logo-2.png";
import { useAuth } from "../../contexts/AuthContext";

// import { db } from "../../firebaseConfig";
// import { collection } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";

const LoginApp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Mật khẩu phải có 8-20 ký tự và bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-app">
      <form onSubmit={handleSubmit}>
        <h1 className="title-login">Đăng nhập</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btnLogin">Đăng nhập</button>
        <div className="bottom">
          <Link to="/register">
            <span className="add-account">
              {" "}
              Do not have an account? Sign Up
            </span>
          </Link>
          <Link to="/">
            <img className="imgLogo" src={Logo} alt="logo" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginApp;
