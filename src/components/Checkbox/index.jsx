import { useState } from "react"


export default function Checkbox ({label, isChecked, onChange}) {
    

    return (
        <div className="checkbox">
            <label>
                <input type="checkbox" className="checkbox__input" checked={isChecked} onChange={onChange}/>
                <span className="checkbox__label"> {label} </span>
            </label>
        </div>
    )
}