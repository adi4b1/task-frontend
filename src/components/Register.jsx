import React, { useState } from "react";

const Register = ({ showLogin }) => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://task-backend-beige.vercel.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const responseData = await response.json();
    //   console.log(responseData);

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
      <div>
        <br />
        <section className="forRegisterDisplay">
          <form
          align="center"
            onSubmit={registerHandler}
            className=" card form-control"
          >
            <label htmlFor="">Username</label>
            <input
              type="text"
              name="username"
              required={true}
              value={data.username}
              onChange={(e) =>
                setdata({ ...data, [e.target.name]: e.target.value })
              }
            />
<br />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              required={true}
              value={data.email}
              onChange={(e) =>
                setdata({ ...data, [e.target.name]: e.target.value })
              }
            />
<br />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              required={true}
              value={data.password}
              onChange={(e) =>
                setdata({ ...data, [e.target.name]: e.target.value })
              }
            />
            <br />

            <input type="submit" value="Register" />
            <span>
              already register?<a onClick={showLogin}>login</a>
            </span>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
