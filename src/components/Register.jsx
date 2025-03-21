import React, { useState } from "react";
import { API_URL } from "./api";
import { ToastContainer, toast } from "react-toastify";
const Register = ({ showLogin }) => {
  const notify = () =>
    toast("Successfully Registered 😀", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const [registered, setregistered] = useState(false);
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      setregistered(true);
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setregistered(true);
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const responseData = await response.json();
      //   console.log(responseData);
      if (response.ok) {
        toast("Registered Success 😀", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        showLogin();
      }
      setdata({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(`❌ ${error.message}`, { position: "top-right" });
    }
    setregistered(false);
  };
  return (
    <>
      {/* <div> */}
      {/* <>
        <h1 className='Title'>Taskify</h1>
        <h4>Welcome to Taskify 🙏</h4>
    </> */}
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

          <button type="submit" className="btn btn-success" onClick={notify}>
            {registered ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              "Register"
            )}
          </button>
          <ToastContainer />
          <span>
            already register?&nbsp;
            <a onClick={showLogin} style={{ cursor: "pointer", color: "blue" }}>
              login
            </a>
          </span>
        </form>
      </section>
      {/* </div> */}
    </>
  );
};

export default Register;
