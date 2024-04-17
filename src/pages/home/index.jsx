import Banner from "../../components/Banner/index"
import data from "../../assets/featuresList.json"
import Feature from "../../components/Feature"
import "./index.css"

export default function HomePage(){

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