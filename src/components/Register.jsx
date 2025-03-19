import React, { useState } from "react";
import { API_URL } from "./api";
const Register = ({ showLogin }) => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const responseData = await response.json();
      //   console.log(responseData);
      if(response.ok){
        showLogin()
      }
      setdata({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div> */}
      
      <section className="forRegisterDisplay">
        <form
          align="center"
          onSubmit={registerHandler}
          className="card forForm"
        >
          {/* <label htmlFor="">Username</label> */}
          <input
            type="text"
            name="username"
            required={true}
            placeholder="enter username"
            value={data.username}
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })
            }
          />
          <br />
          {/* <label htmlFor="">Email</label> */}
          <input
            type="email"
            name="email"
            required={true}
            placeholder="enter email"
            value={data.email}
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })
            }
          />
          <br />
          {/* <label htmlFor="">Password</label> */}
          <input
            type="password"
            name="password"
            required={true}
            placeholder="enter password"
            value={data.password}
            onChange={(e) =>
              setdata({ ...data, [e.target.name]: e.target.value })
            }
          />
          <br />

          <button type="submit"className="btn btn-success">Register</button>
          <span>
            already register?&nbsp;<a onClick={showLogin}
            style={{cursor:"pointer"}}
            >login</a>
          </span>
        </form>
      </section>
      {/* </div> */}
    </>
  );
};

export default Register;
