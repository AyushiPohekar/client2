import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API } from "./global";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const setVal = (e) => {

    const { name, value } = e.target;
    console.log(name)

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    // if (email === "") {
    //   toast.error("email is required!", {
    //     position: "top-center",
    //   });
    // } else if (!email.includes("@")) {
    //   toast.warning("includes @ in your email!", {
    //     position: "top-center",
    //   });
    // } else if (password === "") {
    //   toast.error("password is required!", {
    //     position: "top-center",
    //   });
    // } else if (password.length < 6) {
    //   toast.error("password must be 6 char!", {
    //     position: "top-center",
    //   });
    // }
     if (email === "") {
        alert("please enter your email");
      } else if (!email.includes("@")) {
        alert("Enter valid email");
      } else if (password === "") {
        alert("Enter your password");
      } else if (password.length < 6) {
        alert("password must be 6 characters");
      }
    else {
      //console.log("user Login succesful");
      const data = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);
      if (res.status == 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash");
        setInpval({ ...inpval, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back,Log In</h1>
            <p>Hi,we are glad you are back.Please Login</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                onChange={setVal}
                value={inpval.email}
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={passShow ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password "
                  onChange={setVal}
                  value={inpval.password}
                ></input>
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {passShow ? "Hide" : "Show"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              
              Login
            </button>
            <p>
              Don't have an Account?<NavLink to="/register">Sign Up</NavLink>
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password<NavLink to="/password-reset">Click here</NavLink>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
