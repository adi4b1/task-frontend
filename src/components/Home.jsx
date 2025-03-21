// import Nav from './Nav'
import Alltasks from "./Alltask";
import { ToastContainer, toast } from "react-toastify";
const Home = ({ LogoutHandler, setregister }) => {
  return (
    <>
      {/* <Nav LogoutHandler={LogoutHandler} getBooleanFromStorage={getBooleanFromStorage} showRegister={showRegister} showLogin={showLogin} showHome={showHome}/> */}
      <Alltasks LogoutHandler={LogoutHandler} />
    </>
  );
};

export default Home;
