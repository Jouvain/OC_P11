import { PropTypes } from "prop-types";
import { useState, useRef, useEffect } from "react";
import "./index.css"

export default function Modal({openModal, closeModal, children}) {
    
    const ref = useRef()
    useEffect(()=> {
        if(openModal) {
            ref.current?.showModal()
        }
        else {
            ref.current?.close()
        }
    }, [openModal])

    return (
        <dialog ref={ref} onCancel={closeModal} >
            {children}
            <button onClick={closeModal} className="modal__button"> Close </button>
        </dialog>
    )
}

