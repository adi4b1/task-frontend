// import Nav from './Nav'
import Alltasks from './Alltask'

const Home=({LogoutHandler})=>{
    return(
        <>
            {/* <Nav LogoutHandler={LogoutHandler} getBooleanFromStorage={getBooleanFromStorage} showRegister={showRegister} showLogin={showLogin} showHome={showHome}/> */}
            <Alltasks LogoutHandler={LogoutHandler}/>
        </>
    )
}


export default Home