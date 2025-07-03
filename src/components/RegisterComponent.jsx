import React, { useState } from "react";
import { GoogleSignInAPI, RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import GoogleButton from 'react-google-button';

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };
   // Dummy Google sign-in function (you can replace this with actual Google auth integration)
   const googleSignIn = () => {
    let response=GoogleSignInAPI();
    console.log(response);
  };

  return (
    <div className="register-container">
      {/* Left side form */}
      <div className="register-form">
        <div className="login-wrapper-inner">
          <h1 className="heading">Make the most of your professional life</h1>

          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, name: event.target.value })
              }
              type="text"
              className="common-input"
              placeholder="Your Name"
            />
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, email: event.target.value })
              }
              type="email"
              className="common-input"
              placeholder="Email or phone number"
            />
            <input
              onChange={(event) =>
                setCredentials({ ...credentails, password: event.target.value })
              }
              type="password"
              className="common-input"
              placeholder="Password (6 or more characters)"
            />
          </div>
          <button onClick={register} className="login-btn">
            Agree & Join
          </button>
          
        </div>
        <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
        <GoogleButton
          onClick={googleSignIn}
        />
          <p className="go-to-signup">
            Already on ReadyAthlete?{" "}
            <span className="join-now" onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right side image */}
      <div className="register-image">
        <img src={Logo} alt="Company Logo" className="linkedinLogo" />
      </div>
    </div>
  );
}
