import icon from "../../assets/img/circle-user-solid.svg" 
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../features/users/usersSlice"
import { useState } from "react"
import "./index.css"



export default function SigninForm(){
    const dispatch = useDispatch()
    const [userMail, setUserMail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    
    

    function handleClick(event){
        event.preventDefault()
        dispatch(loginUser(userMail, userPassword))
        console.log(userMail)
        console.log(userPassword)  
    }

    return(
        <section className="signinForm">
            <img src={icon} className="signinForm__icon"/>
            <h1 className="signinForm__title"> Sign In </h1>
            <form className="signinForm__form">
                <div className="signinForm__inputs">
                    <label htmlFor="usermail" > Mail </label>
                    <input id="username" type="text" value={userMail}  onChange={ (event) => setUserMail(event.target.value)} />
                </div>
                <div className="signinForm__inputs">
                    <label htmlFor="password" > Password </label>
                    <input id="password" type="password" value={userPassword} onChange={ (event) => setUserPassword(event.target.value)} />
                </div>
                <div className="signinForm__remember">
                    <input id="rememberme" type="checkbox" />
                    <label htmlFor="rememberme" > Remember me </label>
                </div>
                <Link to="/user"><button onClick={handleClick} className="signinForm__button"> Sign In </button></Link>
                
                
            </form>
        </section>
    )
}

