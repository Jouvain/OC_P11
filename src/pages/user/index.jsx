import { PropTypes } from "prop-types"
import Button from "../../components/Button"
import Dashline from "../../components/Dashline"
import Modal from "../../components/Modal"
import FormChange from "../../components/FormChange"
import { tokenUser} from "../../features/users/usersSlice"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector} from "react-redux"
import "./index.css"
import { useState } from "react"

export default function UserPage() {
    const location = useLocation()
    const authentified = useSelector(tokenUser)
    const [modal, setModal] = useState(false)
    const pseudo = useSelector((state) => state.user.user)
    const isChecked = location.state
    let content

    function createCookie(name, value, expire) {
    // créé un cookie attaché à la racine du domaine pour "expire" jours
        const date = new Date()
        date.setTime(date.getTime() + (expire*24*60*60*1000))
        let expireString = "expires="+date.toUTCString()
        document.cookie = name + "=" + value + ";" + expireString + ";path=/"
    }
    

    // SI le composant "SigninForm" avait la case "rememberme" cochée ALORS infos-utilisateurs => Cookie
    if (isChecked) { 
        createCookie("firstname",pseudo.firstName,1)
        createCookie("token",authentified,1)
        createCookie("username", pseudo.userName, 1)
        createCookie("lastname", pseudo.lastName, 1)
    }

    function opening(){
        setModal(true)
    }
    // ******** contenu protégé ***********
    // SI échec de l'authentification ALORS redirection
    if (!authentified) {
        return <Navigate to="/signin" />
    } // SINON affichage du profil
    else {
        let personna = pseudo.firstName + " " + `"${pseudo.userName}"` + " " + pseudo.lastName
        content = (
            <>
                <div className="user__header">
                    <h1 className="user__title"> {personna} </h1>
                    <div>
                        <Modal openModal={modal} closeModal={()=>setModal(false)}  >
                            <FormChange closeModal={()=>setModal(false)} />
                        </Modal>
                        <Button  style="button--user__header" label={"Edit Name"} click={opening} /> 
                    </div>
                </div>
                <Dashline />
                <Dashline title="Fictious account" text1="$ 500, 189.72"/>
                <Dashline title="Dummy operations" text1="$ 17,000"/>
            </>
        )

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
