import React from 'react'

const Login = () => {
  return (
    <>
        <div>
            <section>
                <br />
                <form className='forLoginDisplay form-control'>
                    <label htmlFor="">Email</label>
                    <input type="text"  required={true}/>
                    <label htmlFor="">Password</label>
                    <input type="text" required={true}/>
                    <input type="submit" value='Login'/>
                </form>
              
            </section>
        </div>
    </>
  )
}

export default Login