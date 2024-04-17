import PropTypes from "prop-types"
import "./index.css"

export default function Feature({icon, title, text}){
    return(
        <div className="feat">
            <img src={icon.img} alt={icon.alt} className="feat__icon" />
            <h3 className="feat__title"> {title} </h3>
            <p> {text} </p>
        </div>
    )
}

Feature.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.string
}
