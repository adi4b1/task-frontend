import React, { useState } from 'react'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Welcome from './Welcome'
const index = () => {
    const[register,setregister]=useState(false)
    const[login,setlogin]=useState(false)
    const[home,setHome]=useState(false)
    const[loading,setloading]=useState(false)

    const showRegister=()=>{
        setloading(true)
        setregister(true)
        setlogin(false)
        setHome(false)
        setloading(false)
    }
    const showLogin=()=>{
        setloading(true)
        setregister(false)
        setlogin(true)
        setHome(false)
        setloading(false)
    }
  return (
    <>
        {/* <Home/> */}
       <div className='mainComponentBody'>
            <section align="center">
                <Welcome/>
                <br />
                <button className='btn btn-info'
                onClick={showRegister}
                >Register</button>&nbsp;
                <button className='btn btn-success'
                onClick={showLogin}
                >Login</button>

                {/* ///for components display */}
                {loading&&<p>Loading........</p>}
                {register&&<Register showLogin={showLogin}/>}
                {login&&<Login/>}
            </section>
            
       </div>
    </>
  )
}

export default index