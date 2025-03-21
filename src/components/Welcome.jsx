import React from "react";
import Register from "./Register";
const Welcome = ({ showLogin, register, login }) => {
  return (
    <>
      <h1 className="Title">Taskify</h1>
      <h4>Welcome to Taskify 🙏</h4>
      {register && !login && <Register showLogin={showLogin} />}
    </>
  );
};

export default Welcome;
