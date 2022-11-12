import React, {useContext} from "react";
import orderIsOk from "../../images/orderIsOk.png"
import styles from "./order-details.module.css";
import { OrderNumberContext } from "../../services/constructorContext";

export default function OrderDetails() {

    const { orderNumberState } = useContext(OrderNumberContext);
    const [number, status, desc] = [orderNumberState.number, 'Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции'];

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