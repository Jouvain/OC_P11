import { PropTypes } from "prop-types"
import Button from "../../components/Button"
import Dashline from "../../components/Dashline"
import { tokenUser, fetchUser } from "../../features/users/usersSlice"
import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "./index.css"
import { useEffect } from "react"

export default function UserPage({username}) {
    
    const dispatch = useDispatch()
    const authentified = useSelector(tokenUser)
    const token = useSelector(tokenUser)
    const pseudo = useSelector((state) => state.user.userName)
 
    async function fetchingUser() {
        try {
            await dispatch(fetchUser(token)).unwrap()
       } catch (error) {
            console.error("fetchUser bugged !", error)
       }
    }

    useEffect(() => {
        fetchingUser()
    }),[dispatch]

    if (!authentified) {
        return <Navigate to="/signin" />
    }
    else {
        return(
            <main className="user__main">
                <div className="user__header">
                    <h1 className="user__title"> {pseudo} </h1>
                    <div>
                    <Button  style="button--user__header" label={"Edit Name"} />
                    </div>
                </div>
                <Dashline />
    
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
