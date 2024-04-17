import { PropTypes } from "prop-types"
import Button from "../../components/Button"
import Dashline from "../../components/Dashline"
import "./index.css"

export default function UserPage({username}) {
    return(
        <main className="user__main">
            <div className="user__header">
                <h1 className="user__title"> {username} </h1>
                <div>
                <Button  style="button--user__header" label={"Edit Name"} />
                </div>
            </div>
            <Dashline />

        </main>
    )
}

UserPage.propTypes = {
    username: PropTypes.string
}
UserPage.defaultProps = {
    username: "Jacky Jack"
}
