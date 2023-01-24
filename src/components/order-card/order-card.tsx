import { FC } from "react";
import styles from './order-card.module.css'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Icons from "./icons/icons";
import { TOrder } from "../../utils/types";

type TOrderCard = {
    order: TOrder,
    onClickFunc: (number: number) => void;
}

const OrderCard: FC<TOrderCard> = ({order, onClickFunc}) => {

    return (
        <div className={`${styles.card} mt-4 p-6`} onClick={()=> onClickFunc ? onClickFunc(order.number) : null}>
            <div className={`${styles.content} mt-6`}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default"><FormattedDate date={new Date(order.createdAt)} /></p>
            </div>
            <div className={`${styles.content} mt-6`}>
                <h2 className={`${styles.title} text text_type_main-medium mt-6`}>{order.name}</h2>
            </div>
            <div className={`${styles.content} mt-4`}>
                <h2 className={`${styles.title} text text_type_main-default mt-2`}>{order.status === 'done' ? 'Выполнен' : 'Готовится'}</h2>
            </div>
            <div className={`${styles.content} mt-6`}>
                <Icons ingredients={order.ingredients}/>
            </div>
        </div>
    )
}

export default OrderCard;
