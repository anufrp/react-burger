import React, {FC, useCallback} from "react";
import ReactDOM from 'react-dom';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css"
import ModalOverlay from "../modal-overlay/modal-overlay";

//DOM элемент для модалок
const modalDomRoot = document.getElementById("modalRoot") as HTMLDivElement;

type TModalProps = {
    closeFunc: () => void,
    title?: string,
    children: React.ReactNode
};

const Modal: FC<TModalProps> = ({title, closeFunc, children}) => {

    const body = document.querySelector("body") as HTMLBodyElement;

    const esc = useCallback((event: KeyboardEvent) => {
        if(event.key === "Escape") {
            closeFunc();
        }
    }, [closeFunc]);

    React.useEffect(() => {
        //подписка на Esc
        document.addEventListener("keydown", esc, false);

        const bodyWidth = body.scrollWidth;
        body.style.overflow = "hidden";
        body.style.width = bodyWidth + 'px';

        return () => {
            document.removeEventListener("keydown", esc, false);
            body.style.overflow = "auto";
        };
    }, [esc]);

    return ReactDOM.createPortal(
            <>
                <ModalOverlay onClickFunc={closeFunc}/>

                <div className={styles.modal}>
                    <div className={`${styles.header} ml-10 mt-10 mr-10`}>
                        <span className="text text_type_main-large">{title}</span>
                        <CloseIcon type="primary" onClick={closeFunc}/>
                    </div>

                    {children}

                </div>
            </>,
            modalDomRoot
    );
}

export default Modal;
