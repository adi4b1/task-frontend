import TaskCom from "./TaskCom";
// import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { Offcanvas } from "bootstrap";
import {
  fetchTasks,
  createTask,
  getPriority,
  getisComplete,
  getlayoutmodal,
  getLayout,
} from "../redux/taskSlice";
// import {createTask} from "../redux/createTask"
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { AlignJustify } from "lucide";
// const reducerfunction = (state, action) => {
//     switch (action.type) {
//         case 'load':
//             return { ...state, load: true, error: null };
//         case 'data':
//             return {
//                 ...state,
//                 load: false,
//                 data: Array.isArray(action.payload) ? action.payload : [],
//                 error: null
//             };
//         case 'error':
//             return { ...state, load: false, error: action.payload };
//         default:
//             return state;
//     }
// };

const Alltasks = ({ LogoutHandler }) => {
  const dispatch = useDispatch();
  const [minDate, setminDate] = useState("");
  const { alltasks, tasks, loading, error, layout, layoutmodal } = useSelector(
    (state) => state.tasks
  );
  const inpref = useRef(null);

  // const[radioValue,setradioValue]=useState(intialRadio)
  useEffect(() => {
    setAll(true);
    dispatch(fetchTasks());
  }, [dispatch]);

  const [modal, setmodal] = useState(false);
  const [message, setmessage] = useState(false);
  const [pending, setpending] = useState(false);
  const [completed, setcompleted] = useState(false);

  const [high, sethigh] = useState(false);
  const [medium, setmedium] = useState(false);
  const [low, setlow] = useState(false);
  const [All, setAll] = useState(false);
  // const[isSubmit,setissubmit]=useState(false)
  const [taskdata, settaskdata] = useState({
    taskname: "",
    priority: "",
    deadline: "",
    finishedDate: new Date().toISOString(),
    isComplete: false,
  });

  const inputHandler = (e) => {
    settaskdata({ ...taskdata, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setmodal(!modal);
  };

  const refreshHandler = () => {
    // setradioValue('All')

    dispatch(fetchTasks());
    dispatch(getPriority("All"));
    dispatch(getisComplete(0));
    setAll(true);
    sethigh(false);
    setmedium(false);
    setlow(false);
    setpending(false);
    setcompleted(false);
    // console.log(intialRadio);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(createTask(taskdata)); //wait for task ceration after second dispatch works

    settaskdata({
      taskname: "",
      priority: "",
      deadline: "",
    });
    setTimeout(() => {
      dispatch(fetchTasks());
    }, 2000);
    setmessage(false);
  };

  const reversedArray = tasks.map((i) => i).reverse();
  // console.log('reversedArray',reversedArray);

  const closeUIModal = () => {
    dispatch(getlayoutmodal(!layoutmodal));
  };

  const setLayoutChange = (e) => {
    // let targetContent=document.getElementsByClassName('boxContent')
    // if(targetContent){
    if (e.target.tagName == "H3") {
      dispatch(getLayout(e.target.textContent));
      // console.log(e.target.textContent);
    }

    // }
    // console.log(targetContent);

    // console.log('layout',layout);
  };
  // const setLayoutChange1=()=>{
  //     dispatch(getLayout("Rectangle"))
  //     console.log('layout',layout);
  // }
  const pendingClickHandler = (e) => {
    setpending(true);
    setcompleted(false);
    setAll(false);
    sethigh(false);
    setmedium(false);
    setlow(false);
    dispatch(getisComplete(Boolean(0)));
  };
  const completeClickHandler = (e) => {
    setpending(false);
    setcompleted(true);
    setAll(false);
    sethigh(false);
    setmedium(false);
    setlow(false);
    dispatch(getisComplete(Boolean(1)));
  };
  const AllClickHandler = (e) => {
    setAll(true);
    setpending(false);
    setcompleted(false);
    sethigh(false);
    setmedium(false);
    setlow(false);
    dispatch(getisComplete("All"));
  };

  const HighClickFilterHandler = () => {
    sethigh(true);
    setmedium(false);
    setlow(false);
    dispatch(getPriority("High"));
    // console.log('fg',typeof getPriority('High'));
  };
  const MediumClickFilterHandler = () => {
    sethigh(false);

    setmedium(true);
    setlow(false);
    dispatch(getPriority("Medium"));
  };
  const LowClickFilterHandler = () => {
    setlow(true);
    sethigh(false);
    setmedium(false);
    dispatch(getPriority("Low"));
  };

  const dateClickHandler = (e) => {
    const getDate = new Date().toISOString().split("T")[0];
    if (inpref.current) {
      inpref.current.setAttribute("min", getDate);
    }
    setminDate(getDate);
    // console.log(getDate);
    // console.log(inpref);
  };

  const canvasRef = useRef();

  const showCanvas = () => {
    const bsCanvas = new Offcanvas(canvasRef.current);
    bsCanvas.show();
  };
  return (
    <div className="headerAllTask">
      <div className="taskBlock">
        <h3 className="Title">Taskify</h3>

        <button className="createButton" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>&nbsp;Task
        </button>
      </div>
      <hr/>
      <div className="mainBodyAlltasks">
        <div className="NavDisplayInAllTasks">
        <Nav LogoutHandler={LogoutHandler} />
        </div>
        
        {/* <hr /> */}
        <div>
          <div className="actions">
            <button className="btn offCanvasButton"  onClick={showCanvas}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg>
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              ref={canvasRef}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <Nav LogoutHandler={LogoutHandler} />
              </div>
            </div>
            <button onClick={refreshHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
            </button>
            <button
              onClick={AllClickHandler}
              style={
                All
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              All
            </button>
            <button
              onClick={completeClickHandler}
              style={
                completed
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              Completed
            </button>
            <button
              onClick={pendingClickHandler}
              style={
                pending
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              Pending
            </button>

            {/* ///priorites */}
            <div className="forvertical"></div>
            <button
              onClick={HighClickFilterHandler}
              style={
                high
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              H
            </button>

            <button
              onClick={MediumClickFilterHandler}
              style={
                medium
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              M
            </button>

            <button
              onClick={LowClickFilterHandler}
              style={
                low
                  ? {
                      color: "white",
                      border: "2px solid green",
                      backgroundColor: "green",
                    }
                  : {}
              }
            >
              L
            </button>
          </div>
          {/* <hr /> */}
          <div>
            <div className="forLoading">
              {loading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {error && !alltasks && <p>getting error</p>}
            </div>
            <div className="taskCards">
              <TaskCom
                tasks={reversedArray}
                alltasks={alltasks}
                loading={loading}
                error={error}
                layout={layout}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ////modal */}
      {modal && (
        <section className="forModal">
          <button
            onClick={() => {
              setmodal(false);
              setmessage(false);
            }}
            className="closeModalButton"
          >
            X
          </button>
          <span style={{ color: "green" }}>
            {message && "form submitted sucesfully 😀"}
          </span>
          <form onSubmit={formSubmitHandler} className="formBody ">
            <label htmlFor="taskname">Taskname</label>
            <textarea
              type="text"
              id="taskname"
              className="form-control"
              onChange={inputHandler}
              name="taskname"
              required
              value={taskdata.taskname}
              placeholder="enter your task"
            />

            <label htmlFor="priority">priority</label>
            <select
              name="priority"
              onChange={inputHandler}
              className="form-control"
              value={taskdata.priority}
              id="priority"
              required
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label htmlFor="deadline">deadline</label>
            <input
              type="date"
              onChange={inputHandler}
              min={minDate}
              required
              onClick={dateClickHandler}
              ref={inpref}
              className="form-control"
              value={taskdata.deadline}
              name="deadline"
              id="deadline"
            />

            <button type="submit" className="btn btn-success">
              submit
            </button>
          </form>
        </section>
      )}

      {layoutmodal && (
        <div className="forModal">
          <button onClick={closeUIModal} className="closeModalButton">
            X
          </button>

          <section className="forSection" onClick={setLayoutChange}>
            <div
              className="boxContent"
              style={layout === "Square" ? { border: "3px solid green" } : {}}
            >
              <h3 style={{ cursor: "pointer" }}>Square</h3>
              <div className="forparentDivSqaure">
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                <div className="childSquare"></div>
                {/* <div className="childSquare"></div>
                    <div className="childSquare"></div> */}
              </div>
            </div>
            <div
              className="boxContent"
              style={
                layout === "Rectangle" ? { border: "3px solid green" } : {}
              }
            >
              <h3 style={{ cursor: "pointer" }}>Rectangle</h3>
              <div className="forparentDivRect">
                <div className="childRect"></div>
                <div className="childRect"></div>
                <div className="childRect"></div>
                <div className="childRect"></div>
                <div className="childRect"></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Alltasks;
