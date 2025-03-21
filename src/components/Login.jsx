import React, { useState } from "react";
import { API_URL } from "./api";
import { ToastContainer, toast } from "react-toastify";
// toast.configure();
const Login = ({ showHome, showRegister }) => {
  // toast.configure();
  const [loginstatus, setloginstatus] = useState(false);

  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setloginstatus(true);
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
    //   toast("Login Success 😀", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
      const loginResponse = await res.json();
      //   console.log('log data',loginResponse);

      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("current_user", loginResponse.userId);
      localStorage.setItem("current_username", loginResponse.username);
      showHome();
      // console.log(loginResponse.token);
      setlogindata({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.message} check username or password`, {
        position: "top-right",
      });
    }
    setloginstatus(false);
  };
  const gotoRegister = () => {
    showRegister();
  };
  return (
    <>
      {/* <>
        <h1 className='Title'>Taskify</h1>
        <h4>Welcome to Taskify 🙏</h4>
    </> */}
      <section className="forLoginDisplay">
        <br />
        <form onSubmit={loginSubmitHandler} className="card forForm">
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
          <button type="submit" className="btn btn-success">
            {loginstatus ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              "Login"
            )}
          </button>
          {/* <ToastContainer /> */}
          <h6>
            Create a account? &nbsp;
            <span
              onClick={gotoRegister}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Register
            </span>
          </h6>
        </form>
      </section>
    </>
  );
};

export default Login;
