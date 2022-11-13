import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css"

export default function ModalOverlay({onClickFunc}) {
    return(
            <div className={styles.main} onClick={() => onClickFunc()} />
    )
}

ModalOverlay.propTypes = {
    onClickFunc: PropTypes.func
}
