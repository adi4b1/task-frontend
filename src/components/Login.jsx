import React, { useState } from "react";

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://task-backend-beige.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logindata),
        }
      );
      if (!res.ok) throw new Error("login failed");

      const loginResponse = await res.json();
      if (res.ok) {
        localStorage.setItem("token", loginResponse.token);
        console.log(loginResponse.token);
        setlogindata({
          email: "",
          password: "",
        });
      }
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
