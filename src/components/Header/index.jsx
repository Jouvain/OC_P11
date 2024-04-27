import {Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signOut, tokenUser } from "../../features/users/usersSlice"
import figure from "../../assets/img/circle-user-solid.svg"
import arrow from "../../assets/img/right-from-bracket-solid.svg"
import "./index.css"
import { useState } from "react"

export default function Header() {
    const storedFirstName = localStorage.getItem("firstName")
    const storedToken = localStorage.getItem("tokenKey")
    const dispatch = useDispatch()
    const token = useSelector(tokenUser)
    const pseudo = useSelector((state) => state.user.user) 
    const navigate = useNavigate()
    //const [isLogged, setIsLogged] = useState(false)

    const cookieName = findCookie("firstname")
    const cookieToken = getCookie("token")
    /*
    if (cookieToken || token) {
        setIsLogged(true)
    }
    */
    
    function findCookie(name) {
        let allCookies = document.cookie
        if (allCookies) {
            let value = allCookies
            .split(";")
            .find((row)=> row.startsWith(`${name}=`))
            ?.split("=")[1]
            return value
        } else {
            return null
        }

    }

    function deleteCookie(name){
        //document.cookie = `${name}= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }

    function getCookie(name) {
       return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    }

    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
      )

    function handleClick(){
        dispatch(signOut())
        
        if (cookieToken) {
            deleteCookie("firstname")
            deleteCookie("token")
            console.log("on efface !")
            navigate("/")
        }
        setIsLogged(false)
    }

    console.log(cookieToken)
    console.log(cookieName)
    console.log(document.cookie)
    

    // ********* les différents contenus conditionnels *************
    // SI il y a un token dans le Local on affiche le nom mis en Local SINON celui du Store
    const signOutButton = (
        <div className="main-nav__container">
        <Link to="/user" className="main-nav__item">
            <img src={figure} alt="icone de silhouette dans un cercle"></img>
            <p> {cookieToken===null || cookieToken === "" ? pseudo.firstName : cookieName} </p>
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
           { token || cookieToken ? (signOutButton) : (signInButton)  }   
        </nav>
    )
}