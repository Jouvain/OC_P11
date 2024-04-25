import Banner from "../../components/Banner/index"
import data from "../../assets/featuresList.json"
import Feature from "../../components/Feature"
import { useDispatch } from "react-redux"
import { rememberUser } from "../../features/users/usersSlice"
import "./index.css"

export default function HomePage(){
    const dispatch = useDispatch()
    const localToken = localStorage.getItem("tokenKey")
    if (localToken !== null) {
        dispatch(rememberUser(localToken))
    }

    return(
        <>
        <Banner />
        <section className="features">
            {
                data.map((element) => {
                    return(
                        <Feature icon={element.icon} title={element.title} text={element.text} key={element.id} />
                    )
                })
            }
        </section>
        </>
    )
}