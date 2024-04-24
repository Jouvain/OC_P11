import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signOut, tokenUser } from "../../features/users/usersSlice"
import figure from "../../assets/img/circle-user-solid.svg"
import arrow from "../../assets/img/right-from-bracket-solid.svg"
import "./index.css"


export default function Header() {

    const dispatch = useDispatch()
    const token = useSelector(tokenUser)
    let empty
    const pseudo = useSelector((state) => state.user.user) 
    
    
    function handleClick(){
        dispatch(signOut())
    }

    const signOutButton = (
        <div className="main-nav__container">
        <Link to="/user" className="main-nav__item">
            <img src={figure} alt="icone de silhouette dans un cercle"></img>
            <p> {token ? pseudo.firstName : empty} </p>
        </Link>
        <Link to="/" className="main-nav__item"  onClick={handleClick}>
            <img src={arrow} alt="une flèche sortant d'un cube"></img>
            <p> Sign Out </p> 
        </Link>
        </div>)

    const signInButton = (
        <Link to="/signin" className="main-nav__item">
            <img src={figure} alt="icone de silhouette dans un cercle"></img>
            <p> Sign In </p> 
        </Link>)
    

    return(
        <nav className="main-nav">
            <Link to="/">
                <img src="./src/assets/img/argentBankLogo.png" alt="Logo vert et marron d'ArgentBank" className="main-nav__logo"></img>
            </Link>
                
           {token ? (signOutButton) : (signInButton)  }


            
        </nav>
    )
}