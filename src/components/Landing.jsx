import React, { useEffect, useState } from 'react'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Welcome from './Welcome'
const index = () => {

  const getBooleanFromStorage=(key)=>localStorage.getItem(key)==="true";
    const[register,setregister]=useState(
      getBooleanFromStorage('register')
    )
    const[landing,setlanding]=useState(
      getBooleanFromStorage('landing')
    )
    const[login,setlogin]=useState(
      getBooleanFromStorage('login') 
    )
    const[home,setHome]=useState(
      getBooleanFromStorage('home')
    )
    const[loading,setloading]=useState(
      getBooleanFromStorage('loading') 
    )
    const[logout,setlogout]=useState(
      getBooleanFromStorage('logout')
    )

    const showRegister=()=>{
        setloading(true)
        setregister((prev)=>!prev)
        setlogin(false)
        setHome(false)
        setlanding(false)
        setlogout(false)
        setloading(false)
    }
    const showLogin=()=>{
        setloading(true)
        setregister(false)
        setlogin((prev)=>!prev)
        setHome(false)
        setlogout(false)
        setlanding(false)
        setloading(false)
    }
    const showHome=()=>{
        setloading(true)
        setregister(false)
        setlogin(false)
        setlogout(false)
        setHome((prev)=>!prev)
        setlanding(false)
        setloading(false)
    }
    const LogoutHandler=()=>{
      setloading(true)
        setregister(false)
        setlanding(true)
        setlogin(false)
        setlogout(false)
        setHome((prev)=>!prev)
        setloading(false)
    }
    useEffect(()=>{
      localStorage.setItem('home',home)
      localStorage.setItem('register',register)
      localStorage.setItem('login',login)
      localStorage.setItem('loading',loading)
      localStorage.setItem('logout',logout)
      localStorage.setItem('landing',landing)
    },[home, loading ,login, register,logout,landing])
  return (
    <>
        {/* <Home/> */}
       <div className='mainComponentBody'>
            <section align="center">
               {landing&&<landing/>}
                {!home &&(
                  <section align="center">
                   <Welcome/>
                   <br />
                    <button className='btn btn-info'
                  onClick={showRegister}
                  >Register</button>
                  <button className='btn btn-success'
                  onClick={showLogin}
                  >Login</button>
                  </section>
                )}

                {/* ///for components display */}
                {loading&&<p>Loading........</p>}
                {register&&<Register showLogin={showLogin}/>}
                {login&&<Login showHome={showHome}/>}
                
            </section>
            {home&&<Home LogoutHandler={LogoutHandler} getBooleanFromStorage={getBooleanFromStorage} showRegister={showRegister} showLogin={showLogin} showHome={showHome} />}
       </div>
       
    </>
  )
}

export default index