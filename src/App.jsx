import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Home from './components/Home'
import Landing from "./components/Landing";
// toast.configure()
function App() {
  return (
    <>
      <Landing />
      <ToastContainer />
    </>
  );
}

export default App;
