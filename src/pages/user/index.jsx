import { PropTypes } from "prop-types"
import Button from "../../components/Button"
import Dashline from "../../components/Dashline"
import { tokenUser, fetchUser } from "../../features/users/usersSlice"
import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import { useEffect } from "react"

export default function UserPage() {
    
    const dispatch = useDispatch()
    const authentified = useSelector(tokenUser)
    
    const pseudo = useSelector((state) => state.user.user)
    const status = useSelector((state) => state.user.status)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUser(authentified))
        }
    }),[dispatch, status]

    let content
    

    if (!authentified) {
        return <Navigate to="/signin" />
    }
    else {
        if (status === "ongoing") {
            content = <h1> LOADING... </h1>
        }
        else if (status === "success") {
            let personna = pseudo.firstName + " " + `"${pseudo.userName}"` + " " + pseudo.lastName
            content = (
                <>
                    <div className="user__header">
                        <h1 className="user__title"> {personna} </h1>
                        <div>
                        <Button  style="button--user__header" label={"Edit Name"} />
                        </div>
                    </div>
                    <Dashline />
                </>
            )
        }
        else if (status === "failure") {
            content = <h1> OH NO ! It's bugged ! </h1>
        }

        return(
            <main className="user__main">
                {content}
            </main>
        )
    }

}

UserPage.propTypes = {
    username: PropTypes.string
}
UserPage.defaultProps = {
    username: "Jacky Jack"
}
