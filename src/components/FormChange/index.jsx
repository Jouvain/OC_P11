import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { tokenUser, editUser } from "../../features/users/usersSlice"
import "./index.css"

export default function FormChange({closeModal}) {
    const [pseudo, setPseudo] = useState("")
    const authentified = useSelector(tokenUser)
    const dispatch = useDispatch()

    async function handleSubmit(event) {
        event.preventDefault()
        let bodytoken = new Object()
        bodytoken.body = {"userName": pseudo}
        bodytoken.token = authentified
        try {
            await dispatch(editUser(bodytoken)).unwrap
        } catch (error) {
            console.error("Edit failed !", error)
        } finally {
            closeModal()
        }
        
        
    }

    return(
        <form className="formChange"  onSubmit={handleSubmit}>
            <label  htmlFor="pseudo" className="formChange__label"> New username : </label>
            <input id="pseudo" value={pseudo} type="text" className="formChange__input" onChange={(event)=> setPseudo(event.target.value)} required/>
            <button type="submit" className="formChange__button"> Save </button>
        </form>
    )
}