import "./index.css"

import PropTypes from "prop-types"

export default function Hero({title1="Nada", title2="Nada", title3="Nada", text="Nada"}){

 
    return(
        <div className="hero">
        <p className="hero__title"> {title1} </p>
        <p className="hero__title"> {title2} </p>
        <p className="hero__title"> {title3} </p>
        <p className="hero__text"> {text} </p>
        </div>
    )
}

Hero.propTypes = {
    title1: PropTypes.string,
    title2: PropTypes.string,
    title3: PropTypes.string,
    text: PropTypes.string
}