import Nav from './Nav'
import Alltasks from './Alltask'

const Home=({getBooleanFromStorage,showRegister,showLogin,showHome,LogoutHandler})=>{
    return(
        <div className='mainBlock'>
            <Nav LogoutHandler={LogoutHandler} getBooleanFromStorage={getBooleanFromStorage} showRegister={showRegister} showLogin={showLogin} showHome={showHome}/>
            <Alltasks/>
        </div>
    )
}


export default Home