import React, { useState } from "react";
// import FormInput from "../FromInput";
import { Link } from "react-router-dom";
import Logo from "../Logo-2.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../../firebase-config";
import "../register/AppRegister.css";
import "../register/custom.css";
import { doc, setDoc } from "firebase/firestore";

// const Register = () => {
//   const { register } = useAuth();

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const history = useHistory();
//   const inputs = [
//     {
//       id: 1,
//       name: "email",
//       type: "email",
//       placeholder: "Email",
//       errorMessage: "Email không hợp lệ!",
//       label: "Email",
//       // required: true,
//     },
//     {
//       id: 2,
//       name: "password",
//       type: "password",
//       placeholder: "Password",
//       errorMessage:
//         "Mật khẩu phải có 8-20 ký tự và bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!",
//       label: "Mật khẩu",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       // required: true,
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(values.email);
//     register(values.email, values.password);

//     history.push("/");
//   };

//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="app-register">
//       <form onSubmit={handleSubmit}>
//         <h1 className="title-register">Đăng ký</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <button className="btnLogin">Đăng ký</button>
//         <div className="bottom">
//           <Link to="/login">
//             <span className="add-account">Have an account? Sign In</span>
//           </Link>
//           <Link to="/">
//             <img className="imgLogo" src={Logo} alt="logo" />
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };
const Register = () => {
  const history = useHistory();
  const { register, currentUser } = useAuth();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [password, setPassword] = useState("");
  // const [chucvu, setChucvu] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(fullName, email, password);
    const temp = await register(email, password);
    try {
      console.log("temp1", temp);
      await setDoc(doc(db, "users", temp.user.uid), {
        FullName: fullName,
        sdt: sdt,
        gioitinh: gioitinh,
        diachi: diachi,
        Email: email,
        Password: password,
        chucvu: "Staff",
      });

      setSuccessMsg("Đăng ký thành công!");
      setFullname("");
      setEmail("");
      setPassword("");
      setChucvu("");
      setErrorMsg("");

      setSuccessMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  if (currentUser) {
    history.push("/");
  }
  return (
    <div className="container-signup">
      {successMsg && (
        <>
          <div className="success-msg">{successMsg}</div>
          <br></br>
        </>
      )}

      <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
        <img className="imgLogo" src={Logo} alt="logo" />
        <h1>Đăng ký</h1>
        {/* <label>Chức Vụ</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setChucvu(e.target.value)}
          value={chucvu}
        ></input> */}
        <label>Họ tên</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setFullname(e.target.value)}
          value={fullName}
        ></input>
        <br></br>

        <label>SDT</label>
        <input
          type="phone"
          className="form-control"
          required
          onChange={(e) => setSdt(e.target.value)}
          value={sdt}
        ></input>
        <br></br>

        <label>Giới tính</label>
        <br />
        <div className="item__gioitinh">
          <label for="nam">Nam</label>
          <input
            type="radio"
            name="sex"
            id="nam"
            value="Nam"
            className="form-control gioitinh"
            required
            onChange={(e) => setGioitinh(e.target.value)}
          ></input>

          <label for="nu">Nữ</label>
          <input
            type="radio"
            name="sex"
            id="nu"
            value="Nữ"
            className="form-control gioitinh"
            required
            onChange={(e) => setGioitinh(e.target.value)}
          ></input>
        </div>
        <br />
        <label>Địa chỉ</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDiaChi(e.target.value)}
          value={diachi}
        ></input>
        <br></br>

        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        {/* <br></br> */}
        {/* <label>Chức Vụ</label>
        <input
          type="text"
          className="form-control chucvu"
          required
          onChange={(e) => setChucvu(e.target.value)}
          value={chucvu}
        ></input> */}
        <br />
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <br></br>
        <div className="btn-box">
          <button className="btnLogin">Đăng ký</button>
          <div className="bottom">
            <Link to="/login">
              <span className="add-account">Have an account? Sign In</span>
            </Link>
          </div>
          {/* <span className="spannn">
            Already have an account Login
            <Link to="/login" className="link">
              {" "}
              Here
            </Link>
          </span> */}
          {/* <button type="submit" className="btn btn-success btn-md">
            SIGN UP
          </button> */}
        </div>
      </form>
      {errorMsg && (
        <>
          <br></br>
          <div className="error-msg">{errorMsg}</div>
        </>
      )}
    </div>
  );
};

export default Register;
