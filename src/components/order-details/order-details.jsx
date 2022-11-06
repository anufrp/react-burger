import React from "react";
import orderIsOk from "../../images/orderIsOk.png"
import styles from "./order-details.module.css";

export default function OrderDetails() {

    let [number, status, desc] = ['034536', 'Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции'];

    return (
        <div className={styles.main}>
            <span className={'text text_type_digits-large mt-20 mb-8'}>
                {number}
            </span>
            <span className="text text_type_main-medium">
                идентификатор заказа
            </span>
            <div className={'mt-15 mb-15'}>
                <img alt="Успешно!" src={orderIsOk} />
            </div>
            <span className="text text_type_main-default">
                {status}
            </span>
            <span className={'text text_type_main-default text_color_inactive mt-2 mb-30'}>
                {desc}
            </span>
        </div>
    )
}