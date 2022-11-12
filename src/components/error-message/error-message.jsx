import React from "react";
import styles from "./error-message.module.css";

export default function ErrorMessage() {

    return (
        <div className={styles.main}>
            <span className={'text text_type_digits-large mt-20 mb-8'}>
                Oops...
            </span>
            <span className="text text_type_main-medium">
                Что-то пошло не так
            </span>
            <span className={'text text_type_main-default text_color_inactive mt-2 mb-30'}>
                Попробуйте оформить заказ еще раз
            </span>
        </div>
    )
}