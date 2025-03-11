
import TaskCom from "./TaskCom"

import { useState,useEffect } from "react"
import { fetchTasks,createTask,getPriority,getisComplete,getlayoutmodal,getLayout} from "../redux/taskSlice"
// import {createTask} from "../redux/createTask"
import { useDispatch,useSelector } from "react-redux"
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


const Alltasks=()=>{

    const dispatch=useDispatch()
    const{tasks,loading,error,layout,layoutmodal}=useSelector((state)=>state.tasks)
    // const[radioValue,setradioValue]=useState(intialRadio)
    useEffect(()=>{
            dispatch(fetchTasks()) 
    },[dispatch])

    
    
    

    const [modal,setmodal]=useState(false)
    const[message,setmessage]=useState(false)
    // const[isSubmit,setissubmit]=useState(false)
    const [taskdata,settaskdata]=useState({
        taskname:"",
        priority:"",
        deadline:'',
        finishedDate:new Date().toISOString(),
        isComplete:false,

    })

    const inputHandler=(e)=>{
        settaskdata({...taskdata,[e.target.name]:e.target.value})
    }

    
    const openModal=()=>{
        setmodal(!modal)
    }
   
   
    const refreshHandler=()=>{
        // setradioValue('All')
        
        
        dispatch(fetchTasks())
        dispatch(getPriority("All"))
        dispatch(getisComplete(0))
        // console.log(intialRadio);
        
        
    }

    const formSubmitHandler=async(e)=>{
        e.preventDefault()
        try {
        await dispatch(createTask(taskdata)).unwrap()//wait for task ceration after second dispatch works
        
            
       
        settaskdata("")
        } catch (error) {
            console.error("Task creation failed:", error);
        }
        finally{
            
                setmessage(!message)
            
            dispatch(fetchTasks())
            settaskdata({
                taskname:"",
        priority:"",
        deadline:'',
       
            })
        }
    }
    
    
    const reversedArray=tasks.map((i)=>i).reverse()
    // console.log('reversedArray',reversedArray);
    
    const closeUIModal=()=>{
        dispatch(getlayoutmodal(!layoutmodal))
    }

    const setLayoutChange=(e)=>{
        // let targetContent=document.getElementsByClassName('boxContent')
        // if(targetContent){
            if(e.target.tagName=="H3"){
                dispatch(getLayout(e.target.textContent))
                console.log(e.target.textContent);
            }
            
            
        // }
        // console.log(targetContent);
        
        
        // console.log('layout',layout);
        
    }
    // const setLayoutChange1=()=>{
    //     dispatch(getLayout("Rectangle"))
    //     console.log('layout',layout);
    // }
    return(
  
        <div className="headerAllTask">
            <div className="taskBlock">
                <h3>Tasks</h3>
                <h3 
                onClick={refreshHandler}
                className="btn btn-outline-primary"
                >🔃</h3>
                <button 
                className="createButton"
                onClick={openModal}>➕Task</button>
            </div> 
            <hr />
            <div className="actions">
                <button>Pending</button>
                <button>
                    completed
                </button>
            </div>
            <div>
            <div className="forLoading">
            {loading&&(
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {error&&<p>getting error</p>}
            </div>
            <div className="taskCards">
           
                <TaskCom tasks={reversedArray} loading={loading} error={error}
              
                layout={layout}
                />
            </div>     
            </div>  
            {/* ////modal */}
           {modal&&(
            <div className="forModal">
                <button onClick={()=>{setmodal(false) ;setmessage(false)}} className="closeModalButton">X</button>
                <span style={{color:"green"}}>{message&&"form submitted sucesfully 😀"}</span>
                <form onSubmit={formSubmitHandler} className="formBody ">
                    
                   
                    <label htmlFor="taskname">Taskname</label>
                    <textarea type="text"
                    id="taskname"
                    className="form-control"
                    onChange={inputHandler}
                    name="taskname"
                    required
                    value={taskdata.taskname}
                    placeholder="enter your task"/>


                    <label htmlFor="priority">
                    priority
                    </label>
                    <select name="priority"
                    onChange={inputHandler}
                     className="form-control"
                    value={taskdata.priority}
                    id="priority" required>
                        <option value="">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <label htmlFor="deadline">deadline</label>
                    <input type="datetime-local"
                    onChange={inputHandler}required
                     className="form-control"
                    value={taskdata.deadline}
                    name="deadline" id="deadline" />




                    <button type="submit" className="btn btn-success">
                        submit
                    </button>
                </form>
            </div>
           )}
           {layoutmodal&&(
             <div className="forModal">
             <button onClick={closeUIModal} className="closeModalButton">X</button>
            

            <section className="forSection" onClick={setLayoutChange} >
               
                <div className="boxContent" style={layout==="Square"?{border:"3px solid green"}:{}}>
                    <h3 style={{cursor:"pointer"}}>Square</h3>
                    <div className="forparentDivSqaure">
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                        <div className="childSquare"></div>
                    </div>
                </div>
                <div className="boxContent" style={layout==="Rectangle"?{border:"3px solid green"}:{}}>
                    <h3 style={{cursor:"pointer"}}>Rectangle</h3>
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

 
    )
}


export default Alltasks