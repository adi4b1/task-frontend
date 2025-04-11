import { useCallback, useEffect,useRef } from "react"
import { useDispatch, useSelector } from "react-redux";

import { updateTask, deleteTask } from "../redux/taskSlice";
import { useState } from "react";
import Notasks from "./Notasks";
const TaskCom = ({ tasks, alltasks, layout }) => {

  const loadRef=useRef()
  const[max,setmax]=useState(5)
  const current_user = localStorage.getItem("current_user");

  let filtertasks = tasks?.filter((i) => i.user && i.user[0] === current_user);

  const [activeTaskId, setActiveTaskId] = useState(null);
  const dis = useDispatch();

  const isCheckedHandler = (taskId, isChecked) => {
    dis(updateTask({ taskId, isChecked }));
  };

  const closeDeleteModal = () => {
    setActiveTaskId(null);
  };
  const deleteTaskHandler = (taskId) => {
    dis(deleteTask(taskId));
    // console.log(typeof taskId);
  };
  const deletemodalHandler = (taskId) => {
    setActiveTaskId(taskId);
  };

  // const isCheckedHandler=async(taskId,isChecked)=>{
  // const newStatus=e.target.checked

  //     try {
  //         await fetch(`https://task-backend-beige.vercel.app/task/update-task/${taskId}`,{
  //             method:"PATCH",
  //             headers:{
  //                 "Content-Type":"application/json",
  //             },
  //             body:JSON.stringify({isComplete:isChecked}),
  //         })
  //         // refreshHandler();
  //         console.log("Before Update:", taskdata);
  //         settaskdata((prev) => {
  //             console.log("Previous State:", prev);
  //             const updatedState = {
  //                 ...prev,
  //                 data: prev.data.map((task) =>
  //                     task._id === taskId ? { ...task, isComplete: isChecked } : task
  //                 ),
  //             };
  //             console.log("Updated State:", updatedState);
  //             return updatedState;
  //         });

  //     } catch (error) {
  //         console.log('error in updating',error);

  //     }
  // }

  const handleObserver=useCallback((entries)=>{
    const target=entries[0]
    if(target.isIntersecting){
      setmax((prev)=>prev+5)
    }
  },[])

  useEffect(()=>{

    if(max>=filtertasks.length) return;
    const option={
      root:null,
      rootMargin:"20px",
      threshold:1.0,
    }

    const observer=new IntersectionObserver(handleObserver,option)

    if(loadRef.current){
      console.log('object entered');
      
      observer.observe(loadRef.current)
    }

    return()=>{
      if(loadRef.current){
        observer.unobserve(loadRef.current)
      }
    }
  },[handleObserver,filtertasks.length,max])
  return (
    <>
      {current_user && (
        <>
          {filtertasks.length > 0 ? (
            <>
              {filtertasks?.slice(0,max).map((i) => {
                return (
                  <div
                    key={i._id}
                    className={
                      layout === "Square" ? "taskBody" : "taskBodyRect"
                    }
                  >
                    <div>
                      {/* <p>{i._id}</p> */}
                      <h6
                        className={
                          i.isComplete ? "checkedtaskname" : "taskname"
                        }
                        title={i.taskname}
                      >
                        {i.taskname.substr(0, 100)}
                      </h6>
                    </div>
                    <div className="taskbodyFooter">
                      <span className="created">
                        {new Date(i.created).toLocaleString()}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          // alignContent:"baseline",
                          gap: "3px",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="isComplete"
                          checked={i.isComplete}
                          className="isCheck rounded-checkbox"
                          onChange={(e) =>
                            isCheckedHandler(i._id, e.target.checked)
                          }
                        />
                        <label htmlFor="isComplete">{i.priority}</label>
                      </div>
                      <span onClick={() => deletemodalHandler(i._id)}>❌</span>
                      {/* <span onClick={()=>deleteTaskHandler(i._id)}>❌</span> */}
                    </div>
                    {activeTaskId === i._id && (
                      <div className="fordeleteModalContainer">
                        <span
                          onClick={closeDeleteModal}
                          className="closeModalButton"
                        >
                          X
                        </span>
                        <span>Are you sure you want to delete ?</span>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTaskHandler(i._id)}
                        >
                          Yes, Delete
                        </button>
                        {/* <button onClick={closeDeleteModal}>Cancel</button> */}
                        {/* <p>{i.taskname.substr(0,20)}</p> */}
                      </div>
                    )}
                  </div>
                );
              })}
              {max<=filtertasks.length&&<>
                <section ref={loadRef} style={{height:"50px"}}>
                <p>Load more</p>
              </section>
              </>}
             
            </>
            
          ) : (
            <section className="place-center">
              <Notasks />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default TaskCom;
