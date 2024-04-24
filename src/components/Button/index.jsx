import {PropTypes} from "prop-types"
import "./index.css"

export default function Button({label, style, click}) {
  
    return(
        <button className={`button ${style}`} onClick={click} > {label} </button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    style: PropTypes.string
}

Button.defaultProps = {
    label: "-- Missing Label --"
}