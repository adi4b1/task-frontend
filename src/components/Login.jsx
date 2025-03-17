import React, { useState } from "react";

const Login = ({showHome}) => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://task-backend-beige.vercel.app/user/login",
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
      console.log('before convert',res);
      
      const loginResponse = await res.json();
      console.log('log data',loginResponse);
      
      
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
  return (
    <>
      <div>
        <section>
          <br />
          <form
            onSubmit={loginSubmitHandler}
            className="forLoginDisplay form-control"
          >
            <label htmlFor="">Email</label>
            <input
              type="email"
              required={true}
              name="email"
              onChange={(e) =>
                setlogindata({ ...logindata, [e.target.name]: e.target.value })
              }
              value={logindata.email}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              required={true}
              name="password"
              value={logindata.password}
              onChange={(e) =>
                setlogindata({ ...logindata, [e.target.name]: e.target.value })
              }
            />

            <input type="submit" value="Login" />
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
