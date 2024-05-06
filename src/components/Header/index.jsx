import {Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signOut, tokenUser, loadCookies } from "../../features/users/usersSlice"
import figure from "../../assets/img/circle-user-solid.svg"
import arrow from "../../assets/img/right-from-bracket-solid.svg"
import "./index.css"


export default function Header() {

    const dispatch = useDispatch()
    const token = useSelector(tokenUser)
    const pseudo = useSelector((state) => state.user.user) 
    const navigate = useNavigate()
    
    // SI il y a un Cookie, ses infos-utilisateur sont stockées dans le Store
    if (document.cookie && token === null) {
        const payload = {token: getCookie("token"), firstname: getCookie("firstname"), username: getCookie("username"), lastname: getCookie("lastname")}
        dispatch(loadCookies(payload))
    }

    function deleteCookie(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }
    function getCookie(name) {
       return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    }
    function handleClick(){
        navigate("/")
        deleteCookie()
        dispatch(signOut())
    }

    // ********* les différents contenus conditionnels *************
    // SI il y a un token SignOut sera affiché SINON SignIn
    const signOutButton = (
        <div className="main-nav__container">
        <Link to="/user" className="main-nav__item">
            <img src={figure} alt="icone de silhouette dans un cercle"></img>
            <p> {pseudo.firstName} </p>
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
           { token ? (signOutButton) : (signInButton)  }   
        </nav>
    )
}