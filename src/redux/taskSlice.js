import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
// import Alltasks from "../components/Alltask";


const initialState={
    loading:false,
    tasks:[],
    alltasks:[],
    error:null,
}



export const createTask=createAsyncThunk(
    'tasks/createTask',
    async(taskdata,{rejectWithValue})=>{
        try {
            const data=await fetch('https://task-backend-beige.vercel.app/task/add-task',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(taskdata)
            })
            if (!response.ok) throw new Error("Failed to submit task");
            const res=await data.json()
            return res
        } catch (error) {
            return rejectWithValue("error in creating task")            
        }
    }
)

export const fetchTasks=createAsyncThunk(
    'tasks/fetchTasks',
    async(_,{rejectWithValue})=>{
        try {
            const response=await fetch('https://task-backend-beige.vercel.app/task/alltasks');
            const data=response.json()
            return data;
        } catch (error) {
            return rejectWithValue("Failed to fetch")
        }
    }
)



export const updateTask=createAsyncThunk(
    'tasks/updateTask',
    async({taskId,isChecked},{rejectWithValue})=>{
        try {
            await fetch(`https://task-backend-beige.vercel.app/task/update-task/${taskId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
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

                state.tasks=state.alltasks.filter((item)=>item.priority==action.payload)
              
            }  
        },
        getisComplete:(state,action)=>{
            state.tasks=state.alltasks.filter((item)=>item.isComplete==action.payload)
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
        
        
    }
})



export const{getPriority,getisComplete}=taskSlice.actions
export default taskSlice.reducer