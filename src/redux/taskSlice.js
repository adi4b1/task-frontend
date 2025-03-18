import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
// import Alltasks from "../components/Alltask";
import { API_URL } from "../components/api.js";

const initialState={
    loading:false,
    tasks:[],
    alltasks:[],
    error:null,
    layout:"Square",
    layoutmodal:false
}


export const createTask=createAsyncThunk(
    'tasks/createTask',
    async(taskdata,{rejectWithValue})=>{
        const token=localStorage.getItem('token');
        // const API_URL="http://localhost:4000/task/add-task"
        
        try {
            const data=await fetch(`${API_URL}/task/add-task`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    token:token,
                    
                },
                body:JSON.stringify(taskdata)
            })
            if (!response.ok) throw new Error("Failed to submit task");
            const res=await data.json()
            // console.log(res,'from thunk');
            
            return res
        } catch (error) {
            return rejectWithValue("error in creating task")            
        }
    }
)

export const deleteTask=createAsyncThunk(
    'tasks/deleteTask',
    async(taskId,{rejectWithValue})=>{
        const token=localStorage.getItem('token');
        try {
            // console.log('from slice function ',typeof taskId);
            const data=await fetch(`${API_URL}/task/deletetask/${taskId}`,{
                method:"DELETE",
                headers:{
                    token:token
                }
                

            })
            if (!data.ok) throw new Error("failed to delete")
          
            return taskId
            // console.log(data);

            
            
        } catch (error) {
            console.log(error);
            return rejectWithValue("error in delete task")
            
        }
    }
)

export const fetchTasks=createAsyncThunk(
    'tasks/fetchTasks',
    async(_,{rejectWithValue})=>{
        // const token=localStorage.getItem('token');
        // console.log('from fetch function',token);
        
        try {
            const response=await fetch(`${API_URL}/task/alltasks`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    // token:token
                }
            });
            const data=response.json()
            // console.log('from slice fetch',data);
            
            return data;
        } catch (error) {
            return rejectWithValue("Failed to fetch")
        }
    }
)



export const updateTask=createAsyncThunk(
    'tasks/updateTask',
    async({taskId,isChecked},{rejectWithValue})=>{
        const token=localStorage.getItem('token');
        try {
            await fetch(`${API_URL}/task/update-task/${taskId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    token:token
                },
                body:JSON.stringify({isComplete:isChecked})
            });
            return {taskId,isChecked}
        } catch (error) {
            console.log(error);
            return rejectWithValue("getting error to update task")
            
        }
    }
)



const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        getPriority:(state,action)=>{
            if(action.payload==="All"){
                state.tasks=state.alltasks
               

            }else{

                state.tasks=state.alltasks.filter((item)=>item.priority===action.payload)
              
            }  
        },
        getisComplete:(state,action)=>{
            state.tasks=state.alltasks.filter((item)=>item.isComplete==action.payload)
        },
        getLayout:(state,action)=>{
            state.layout=action.payload
        },
        getlayoutmodal:(state,action)=>{
            state.layoutmodal=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTasks.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchTasks.fulfilled,(state,action)=>{
            state.loading=false
            state.tasks=action.payload
            state.alltasks=action.payload
        })
        .addCase(fetchTasks.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            const {taskId,isChecked}=action.payload
            state.tasks=state.tasks.map((task)=>
                task._id===taskId? {...task,isComplete:isChecked}:task
            )
            state.alltasks=state.alltasks.map((task)=>
                task._id===taskId?{...task,isComplete:isChecked}:task
        )
        })
        .addCase(updateTask.rejected,(state,action)=>{
            state.error=action.payload
        })
        .addCase(createTask.pending,(state)=>{
            state.loading=true
        })
        .addCase(createTask.fulfilled,(state,action)=>{
            state.load=false
            state.tasks.push(action.payload)
            state.alltasks.push(action.payload)
        })
        .addCase(createTask.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload
        })
        .addCase(deleteTask.pending,(state)=>{
            state.loading;
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.load=false
            const taskId=action.payload
            // console.log('from slice ',taskId);
            
            state.tasks=state.tasks.filter((item)=>item._id!==taskId)
            state.alltasks=state.alltasks.filter((i)=>i._id!==taskId)
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.error=action.payload
        })
        
        
    }
})



export const{getPriority,getisComplete,getLayout,getlayoutmodal}=taskSlice.actions
export default taskSlice.reducer