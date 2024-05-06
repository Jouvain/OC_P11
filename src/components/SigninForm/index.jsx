import icon from "../../assets/img/circle-user-solid.svg" 
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, errorStatus, rememberUser, fetchUser} from "../../features/users/usersSlice"
import { useState } from "react"
import Checkbox from "../Checkbox"

import "./index.css"



export default function SigninForm(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userMail, setUserMail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const status = useSelector(errorStatus)

    const errorMessage = (<span className="signinForm__error"> Something's wrong... mail or password invalid ! </span>)
 
    async function handleSubmit(event){
        event.preventDefault()
        const body = {email: userMail, password:userPassword}
        dispatch(loginUser(JSON.stringify(body))).unwrap()
        .then((token)=>{
            if (token) {
                dispatch(fetchUser(token)).unwrap()
                .then(()=> {
                    const check = isChecked ? true : false
                    navigate("/user", {state: check})  
                })   
            }
        })
    }

    return(
        <section className="signinForm">
            <img src={icon} className="signinForm__icon"/>
            <h1 className="signinForm__title"> Sign In </h1>
            <form className="signinForm__form" onSubmit={handleSubmit}>
                <div className="signinForm__inputs">
                    <label htmlFor="usermail" > Mail </label>
                    <input id="username" type="text" value={userMail}  onChange={ (event) => setUserMail(event.target.value)} required/>
                </div>
                <div className="signinForm__inputs">
                    <label htmlFor="password" > Password </label>
                    <input id="password" type="password" value={userPassword} onChange={ (event) => setUserPassword(event.target.value)} required/>
                </div>
                <Checkbox  label="Remember me"  isChecked={isChecked} onChange={()=> setIsChecked((prev) => !prev)}/>
                <button type="submit" className="signinForm__button"> Sign In </button>
                {status && errorMessage}
            </form>
        </section>
    )
}

