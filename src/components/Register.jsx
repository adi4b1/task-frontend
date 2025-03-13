import React from 'react'

const Register = ({showLogin}) => {
  return (
    <>
        <div>
            <br />
            <section>
                <form action="" className="forRegisterDisplay form-control">
                <label htmlFor="">Username</label>
                <input type="text"  required={true}/>
                <label htmlFor="">Email</label>
                <input type="email" required={true}/>
                <label htmlFor="">Password</label>
                <input type="password" required={true} />

                <input type="submit" value='Register'/>
                <span>already register?<a onClick={showLogin}>login</a></span>
                </form>
               
              
            </section>
        </div>
    </>
  )
}

export default Register