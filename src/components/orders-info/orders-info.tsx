import { FC } from "react";
import styles from './orders-info.module.css'
import { TOrdersStatus } from "../../utils/types";

type TFeedInfo = {
    readonly total?: number;
    readonly totalToday?: number;
    readonly statuses: TOrdersStatus
}

const OrdersInfo: FC<TFeedInfo> = ({total, totalToday, statuses}) => {
    
    let doneOrders = 10;
    let  createdOrders = 10;

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <h2 className="text text_type_main-medium">Готовы:</h2>
                    <div className={styles.orders}>
                        {statuses.done?.map((item, index) => {
                            if (doneOrders === 0) return;
                            doneOrders--;
                            return (
                                <p key={index} className="text text_type_digits-default mt-2">{item}</p>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.column}>
                    <h2 className="text text_type_main-medium">В работе:</h2>
                    <div className={styles.orders}>
                        {statuses.created?.map((item, index) => {
                            if (createdOrders === 0) return;
                            createdOrders--;
                            return (
                                <p key={index} className="text text_type_digits-default mt-2">{item}</p>
                            );
                        })}
                    </div>
                </div>
            </div>
            <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{total}</p>
            <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
        </div>
    )
}

export default OrdersInfo;
