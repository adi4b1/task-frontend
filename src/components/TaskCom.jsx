// import { useEffect } from "react"
import {useDispatch } from "react-redux"

import {updateTask } from "../redux/taskSlice"
const TaskCom=({tasks})=>{
    // console.log('tasks',tasks);
    
const dis=useDispatch()
    

    const isCheckedHandler=(taskId,isChecked)=>{
        // console.log(taskId);
        
        dis(updateTask({taskId,isChecked}))
    }

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


    return(
        <>
            
                {
                    tasks?.map((i)=>{
                        return(
                          
                                <div key={i._id} className="taskBody">
                                    <div>
                                        <h6 className={i.isComplete?'checkedtaskname':'taskname'}>{i.taskname.substr(0,100)}</h6>
                                    </div>
                                    <div className="taskbodyFooter">
                                        <span className="created">{new Date(i.created).toLocaleString()}</span>  
                                        <div style={
                                            {
                                                display:"flex",
                                                flexDirection:"row",
                                                justifyContent:"center",
                                                // alignContent:"baseline",
                                                gap:"3px",
                                                
                                                
                                            }
                                        }>
                                            <input type="checkbox" name="isComplete"
                                            checked={i.isComplete}
                                            className="isCheck"
                                            onChange={(e)=>isCheckedHandler(i._id,e.target.checked)}
                                            />
                                            <label htmlFor="isComplete">{i.priority}</label>
                                        </div>
                                        
                                    </div>
                                </div>
                           
                        )
                    })
                }
        </>
    )
}

export default TaskCom