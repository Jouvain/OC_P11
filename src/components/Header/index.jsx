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
    
    if (document.cookie && token === null) {
        let storedToken = getCookie("token")
        let storedFirstName = getCookie("firstname")
        let storedUserName = getCookie("username")
        let storedLastName = getCookie("lastname")
        const payload = {token: storedToken, firstname: storedFirstName, username: storedUserName, lastname: storedLastName}
        dispatch(loadCookies(payload))
    }

    const cookieName = findCookie("firstname")
    const cookieToken = getCookie("token")
    console.log(cookieToken)
    
    function findCookie(name) {
        let allCookies = document.cookie
        if (allCookies) {
            let value = allCookies
            .split(";")
            .find((row)=> row.startsWith(`${name}=`))
            ?.split("=")[1]
            return value
        } else {
            return ""
        }

    }

    function deleteCookie(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }

    function getCookie(name) {
       return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    }

    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
      )

    function handleClick(){
        navigate("/")
        deleteCookie()
        dispatch(signOut())
        .then(()=>{
            if (cookieToken) {
                deleteCookie()
            }
            
        })
        
    }

    

    // ********* les différents contenus conditionnels *************
    // SI il y a un token dans le Local on affiche le nom mis en Local SINON celui du Store
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
    // contenu rendu SI non connecté
    const signInButton = (
        <Link to="/signin" className="main-nav__item">
            <img src={figure} alt="icone de silhouette dans un cercle"></img>
            <p> Sign In </p> 
        </Link>)
    

    // SI il y a un token dans le "store.user.token" ALORS les infos et boutons de sortie sont affichés SINON juste le bouton d'entrée
    return(
        <nav className="main-nav">
            <Link to="/">
                <img src="./src/assets/img/argentBankLogo.png" alt="Logo vert et marron d'ArgentBank" className="main-nav__logo"></img>
            </Link>
           { token ? (signOutButton) : (signInButton)  }   
        </nav>
    )
}