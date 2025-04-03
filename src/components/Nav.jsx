import { useSelector, useDispatch } from "react-redux";
import { getPriority, getisComplete, getlayoutmodal } from "../redux/taskSlice";
import { useState, useRef } from "react";

const Nav = ({ LogoutHandler }) => {
  const username = localStorage.getItem("current_username");

  // console.log('from nav',username);

  const [logoutoption, setlogoutoption] = useState(false);

  // const [pri,setpri]=useState("All")
  const dispatch = useDispatch();
  const userId = localStorage.getItem("current_user");
  // console.log(userId,'nav');

  const { tasks, alltasks, loading, layout, layoutmodal } =
    useSelector((state) => state.tasks) || [];
  const total = alltasks.filter((i) => i.user && i.user[0] === userId);
  //   console.log("total", total);

  const pending = total.filter((k) => !k.isComplete).length;

  // console.log('tasks',tasks);
  // console.log('alltasks',alltasks);

  const separatedPriority = (alltasks?.map((i) => i.priority) || []).flat();
  const uniqueProp = [...new Set(separatedPriority)];
  //   console.log('prio',uniqueProp);

  // console.log('indi',uniqueProp);

  const priorityRadioHandler = (e) => {
    //    setpri(e.target.value)

    // console.log('second runnnign priority handler');

    dispatch(getPriority(e.target.value));
  };

  // const isCompleteOnChange=(e)=>{

  //     let value=Number(e.target.value)
  //     // console.log(typeof value);

  //     dispatch(getisComplete(Boolean(value)))
  //     // dispatch(getPriority("All"))
  // }
  const radioRef1 = useRef(null);
  const radioRef2 = useRef(null);
  //     const removefilter=(e)=>{
  //         // dispatch(getisComplete(''))
  // if(radioRef1.current){
  //     radioRef1.current.checked=false;
  //     // dispatch(getPriority('All'))

  // }
  // if(radioRef2.current){
  //     radioRef2.current.checked=false;
  //     // dispatch(getPriority('All'))
  // }

  // }

  const layoutmodalHandler = () => {
    dispatch(getlayoutmodal(!layoutmodal));
    // console.log('layoutmodal',layoutmodal);
  };

  const logoutoptionHandler = () => {
    setlogoutoption(!logoutoption);
  };
  return (
    <div className="navInfo">
      <div className="firstnavInfo">
        <div className="childOne">
          <h6>Tasks</h6>
          <span className="badge text-bg-info">{total.length}</span>
        </div>
        <div className="childOne">
          <h6>pending</h6>
          <span className="badge text-bg-secondary">
            {/* {loading&&('loading...')} */}
            {pending}
          </span>
        </div>
      </div>
      {/* <br /> */}
      <div className="secondNavInfo">
        {/* <h5>Filters</h5>
        <label>Priority</label>
        <div key="All">
          <input
            type="radio"
            name="priority"
            onChange={priorityRadioHandler}
            className="form-check-input"
            value="All"
            defaultChecked
          />
          &nbsp;
          <label htmlFor="All">All</label>
          <br />
        </div> */}

        {/* {uniqueProp?.length>0?(
                    uniqueProp?.map((item)=>(
                        <div key={item}>
                            
                           <input type="radio" 
                            name="priority"
                            className="form-check-input"
                            onChange={priorityRadioHandler}
                            value={item}
                            />
                            &nbsp;
                            <label htmlFor={item}>{item}</label>
                        </div>
                    ))
                ):(
                    <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                )} */}
        {/* <hr /> */}
        {/* <label htmlFor="Status">Status</label>
                <span onClick={removefilter}><i class="bi bi-filter"></i></span>
                <div>
                    
                <input type="radio" className="" 
                name="isComplete" 
                value={1}
                onChange={isCompleteOnChange}
                ref={radioRef1}
                />
                <label htmlFor="true">completed</label>
                <br />
                <input type="radio" className="" 
                name="isComplete"
                // defaultChecked
                value={0}
                ref={radioRef2}
                onChange={isCompleteOnChange}
                />
                <label htmlFor="false">pending</label>
                </div> */}
        {/* <hr /> */}
        <section className="changeLayout" onClick={layoutmodalHandler}>
          <span>
            <i className="bi bi-arrow-left-right"></i>
          </span>
          <h6 style={{ cursor: "pointer" }}>Change Layout</h6>
        </section>
        {/* <hr /> */}
        <section className="usernameDisplay" onClick={logoutoptionHandler}>
          <div className="imageClass">
            <span>{username.slice(0, 2)}</span>
          </div>
          <h6 style={{ cursor: "pointer" }}>{username.substr(0, 12)}</h6>
          <span>
            <i className="bi bi-chevron-right"></i>
          </span>
        </section>
        {logoutoption && (
          <section className="logoutClass">
            <span onClick={LogoutHandler} className="logoutButton">
              <i className="bi bi-box-arrow-right"></i> &nbsp;Logout
            </span>
          </section>
        )}
      </div>
    </div>
  );
};

export default Nav;
