import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { tokenUser, editUser, errorStatus, setStateError } from "../../features/users/usersSlice"
import "./index.css"

export default function FormChange({closeModal}) {
    const [pseudo, setPseudo] = useState("")
    const authentified = useSelector(tokenUser)
    const dispatch = useDispatch()
    const status = useSelector(errorStatus)
    const errorMessage = (
        <span className="formChange__error"> Something's went wrong... </span>
    )

    async function handleSubmit(event) {
        event.preventDefault()
        const bodyToken = {body: {"userName": pseudo}, token: authentified}
        dispatch(editUser(bodyToken)).unwrap()
        .then((username)=> {
           if(username){
            closeModal()
           } else {
            console.error("Edit failed !")
            dispatch(setStateError())
           }
        })
    }
    
    return(
        <form className="formChange"  onSubmit={handleSubmit}>
            <label  htmlFor="newPseudo" className="formChange__label"> New username : </label>
            <input id="newPseudo" value={pseudo} type="text" className="formChange__input" onChange={(event)=> setPseudo(event.target.value)} required/>
            <button type="submit" className="formChange__button"> Save </button>
            {status && errorMessage}
        </form>
    )
}