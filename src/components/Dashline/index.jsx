import {PropTypes} from "prop-types"
import Button from "../Button";
import "./index.css"

export default function Dashline({title, text1, text2}) {
    return(
        <div className="dash">
            <div className="dash__infos">
                <h2 className="dash__title"> {title} </h2>
                <p className="dash__text1"> {text1} </p>
                <p className="dash__text2"> {text2} </p>
            </div>
            <div >
                <Button label="View transactions" style="button--dash"/>
            </div>
            
        </div>
    )
}

Dashline.propTypes = {
    title: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
}
Dashline.defaultProps = {
    title: "ArgentBank checking",
    text1: "$ 2,081.79",
    text2: "Available balance"
}