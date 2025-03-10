import { useSelector,useDispatch } from "react-redux"
import {getPriority,getisComplete} from '../redux/taskSlice'
import {useState, useRef } from "react"

const Nav=()=>{
    // const [pri,setpri]=useState("All")
    const dispatch=useDispatch()
    const{tasks,alltasks,loading}=useSelector((state)=>state.tasks)||[]
    const total=alltasks.map((i)=>i).length
    const pending=tasks.filter((k)=>!k.isComplete).length
    
    // console.log('tasks',tasks);
    // console.log('alltasks',alltasks);
    
    
    const separatedPriority=(alltasks?.map((i)=>i.priority)||[]).flat()
    const uniqueProp=[...new Set(separatedPriority)]
   
    // console.log('indi',uniqueProp);
    
    const priorityRadioHandler=(e)=>{
        
    //    setpri(e.target.value)
        
        // console.log('second runnnign priority handler');
        
        dispatch(getPriority(e.target.value))
        
    }

    const isCompleteOnChange=(e)=>{
        
        let value=Number(e.target.value)
        // console.log(typeof value);
        
        
        dispatch(getisComplete(Boolean(value)))
        // dispatch(getPriority("All"))
    }
    const radioRef1=useRef(null)
    const radioRef2=useRef(null)
    const removefilter=(e)=>{
        // dispatch(getisComplete(''))
if(radioRef1.current){
    radioRef1.current.checked=false;
    // dispatch(getPriority('All'))

}
if(radioRef2.current){
    radioRef2.current.checked=false;
    // dispatch(getPriority('All'))
}
        

    }
    
    return(
        <div className="navInfo">
            
            <div>
                <h4>Filters</h4>
                <h6>Tasks:{total}</h6>
                <h6>pending:{pending}</h6>
                <hr />
                <label >Priority</label>
                <div key="All">
                <input type="radio" name="priority"
                onChange={priorityRadioHandler}
                value="All" defaultChecked 
                />
                
                <label htmlFor="All">All</label><br />

                </div>
               
                {uniqueProp?.length>0?(
                    uniqueProp?.map((item)=>(
                        <div key={item}>
                            
                           <input type="radio" 
                            name="priority"
                            onChange={priorityRadioHandler}
                            value={item}
                            />
                            
                            <label>{item}</label>
                        </div>
                    ))
                ):(
                    <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                )}
                <hr />
                <label htmlFor="Status">Status</label>
                <span onClick={removefilter}>❌filter</span>
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
                </div>
               
               
            </div>
        </div>
    )
}



export default Nav