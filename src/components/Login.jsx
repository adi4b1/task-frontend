import React, { useState } from "react";
import { API_URL } from "./api";

const Login = ({showHome,showRegister}) => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/user/login`,
        // "http://localhost:4000/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logindata),
        }
      );
      if (!res.ok) throw new Error("login failed");
    //   console.log('before convert',res);
      
      const loginResponse = await res.json();
    //   console.log('log data',loginResponse);
      
      
        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("current user",loginResponse.userId)
        localStorage.setItem("current username",loginResponse.username)
        showHome()
        // console.log(loginResponse.token);
        setlogindata({
          email: "",
          password: "",
        });
      
    } catch (error) {
      console.log(error);
    }
  };
  const gotoRegister=()=>{
    showRegister()
  }
  return (
    <>
     
        <section className="forLoginDisplay">
          <br />
          <form
            onSubmit={loginSubmitHandler}
            className="card forForm"
          >
            {/* <label htmlFor="">Email</label> */}
            <input
              type="email"
              required={true}
              name="email"
              onChange={(e) =>
                setlogindata({ ...logindata, [e.target.name]: e.target.value })
              }
              value={logindata.email}
              placeholder="enter email"
            />
<br />
            {/* <label htmlFor="">Password</label> */}
            <input
              type="password"
              required={true}
              name="password"
              value={logindata.password}
              placeholder="enter password"
              onChange={(e) =>
                setlogindata({ ...logindata, [e.target.name]: e.target.value })
              }
            />
<br />
            <button type="submit" className="btn btn-success">Login</button>
            <h6>Create a account? &nbsp;<span onClick={gotoRegister} 
            style={{cursor:"pointer"}}
            >Register</span></h6>
          </form>
        </section>
     
    </>
  );
};

export default Login;
