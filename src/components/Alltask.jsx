
import TaskCom from "./TaskCom"

import { useState,useEffect } from "react"
import { fetchTasks ,createTask,getPriority,getisComplete} from "../redux/taskSlice"
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
    const{tasks,loading,error}=useSelector((state)=>state.tasks)
    // const[radioValue,setradioValue]=useState(intialRadio)
    useEffect(()=>{
        setTimeout(dispatch(()=>{
            dispatch(fetchTasks()),
            console.log('displayed 1');
            
        }),1000)

        setTimeout(dispatch(()=>{
         
            dispatch(getisComplete(0))
            console.log('displayed 2');
            
        }),2000)

        setTimeout(dispatch(()=>{
            dispatch(getPriority("All"));
            console.log('displayed 3');
            
        }),3000)
        
   
        
        
    },[dispatch])


   

    const [modal,setmodal]=useState(false)
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
           
                <TaskCom tasks={reversedArray} loading={loading} error={error}/>
            </div>     
            </div>  
            {/* ////modal */}
           {modal&&(
            <div className="forModal">
                <button onClick={()=>setmodal(false)} className="closeModalButton">X</button>
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
        </div>

 
    )
}


export default Alltasks