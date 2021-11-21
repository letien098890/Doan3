import React, { useState } from "react";
import "./AppRegister.css";
import FormInput from "../FromInput";
import { Link } from "react-router-dom";
import Logo from "../Logo-2.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ!",
      label: "Email",
      // required: true,
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
      // required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values.email);
    register(values.email, values.password);
    history.push("/");
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-register">
      <form onSubmit={handleSubmit}>
        <h1 className="title-register">Đăng ký</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btnLogin">Đăng ký</button>
        <div className="bottom">
          <Link to="/login">
            <span className="add-account">Have an account? Sign In</span>
          </Link>
          <Link to="/">
            <img className="imgLogo" src={Logo} alt="logo" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
