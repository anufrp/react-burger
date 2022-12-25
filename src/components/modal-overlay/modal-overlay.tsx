import React, { FC } from "react";
import styles from "./modal-overlay.module.css"

type TModalOverlay = {
    onClickFunc: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({onClickFunc}) => {
    return(
            <div className={styles.main} onClick={() => onClickFunc()} />
    )
}

export default ModalOverlay
