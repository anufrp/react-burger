import React, { FC } from "react";
import styles from "./empty-order-message.module.css";

const EmptyOrderMessage: FC = () => {

    return (
        <div className={styles.main}>
            <span className={'text text_type_main-large mt-20 mb-8'}>
                Пустой заказ
            </span>
            <span className="text text_type_main-medium text_color_inactive">
                Добавьте в конструктор хоть что-нибудь
            </span>
        </div>
    )
}

export default EmptyOrderMessage;
