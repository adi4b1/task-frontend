import React, { useEffect, useState } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";

const index = () => {
  const getBooleanFromStorage = (key) => localStorage.getItem(key) === "true";
  const [register, setregister] = useState(getBooleanFromStorage("register"));
  const [landing, setlanding] = useState(getBooleanFromStorage("landing"));
  const [login, setlogin] = useState(getBooleanFromStorage("login"));
  const [home, setHome] = useState(getBooleanFromStorage("home"));
  const [loading, setloading] = useState(getBooleanFromStorage("loading"));
  const [logout, setlogout] = useState(getBooleanFromStorage("logout"));

  const showRegister = () => {
    setloading(true);
    setregister((prev) => !prev);
    setlogin(false);
    setHome(false);
    setlanding(false);
    setlogout(false);
    setloading(false);
  };
  const showLogin = () => {
    setloading(true);
    setregister(false);
    setlogin((prev) => !prev);
    setHome(false);
    setlogout(false);
    setlanding(false);
    setloading(false);
  };
  const showHome = () => {
    setloading(true);
    setregister(false);
    setlogin(false);
    setlogout(false);
    setHome((prev) => !prev);
    setlanding(false);
    setloading(false);
  };
  const LogoutHandler = () => {
    setloading(true);
    setregister(true);
    setlanding(true);
    setlogin(false);
    setlogout(false);
    setHome((prev) => !prev);
    setloading(false);
  };
  useEffect(() => {
    localStorage.setItem("home", home);
    localStorage.setItem("register", register);
    localStorage.setItem("login", login);
    localStorage.setItem("loading", loading);
    localStorage.setItem("logout", logout);
    localStorage.setItem("landing", landing);
    if (register === false) {
      setregister(true);
    }
  }, [home, loading, login, register, logout, landing]);
  return (
    <>
      {/* <Home/> */}
      {/* <div className='mainComponentBody'> */}
      <section align="center">
        {!home && (
          <section align="center">
            <Welcome showLogin={showLogin} register={register} login={login} />
            {/* {register&&<Register showLogin={showLogin}/>} */}
            <br />

            {/* {!register &&(
                    <>
                      <button className='btn btn-info'
                  onClick={showRegister}
                  >Register</button>
                  <button className='btn btn-success'
                  onClick={showLogin}
                  >Login</button>
                    </>
                    )} */}
          </section>
        )}

        {/* ///for components display */}
        {loading && <p>Loading........</p>}
        {/* {register&&<Register showLogin={showLogin}/>} */}
        {login && <Login showHome={showHome} showRegister={showRegister} />}
      </section>
      {home && (
        <Home
          LogoutHandler={LogoutHandler}
          getBooleanFromStorage={getBooleanFromStorage}
        />
      )}
      {/* </div> */}
    </>
  );
};

export default index;
