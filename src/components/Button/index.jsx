import {PropTypes} from "prop-types"
import "./index.css"

export default function Button({label, style}) {
    return(
        <button className={`button ${style}`}> {label} </button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    style: PropTypes.string
}

Button.defaultProps = {
    label: "-- Missing Label --"
}