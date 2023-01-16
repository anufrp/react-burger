import {FC} from "react";
import styles from './feed-order.module.css'
// import { TFeedItem } from "../../../types/WSData";
// import { getOrderDate } from "../../../functions/getDateToOrder";
// import { OrderIcons } from "../../ProfileOrderHistory/OrderIcons";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedOrder: FC<any> = (props) => {
    const {elem, onClick} = props;

    return (
        <div className={styles.main_item_block} onClick={()=> onClick ? onClick(elem.number) : null}>
            <div className={styles.central_block}>
                <p className="text text_type_digits-default">#{elem.number}</p>
                {/* <p className="text text_type_main-default">{getOrderDate(elem)}</p> */}
            </div>
            <div className={styles.central_block}>
                <h2 className="text text_type_main-medium mt-6">{elem.name}</h2>
            </div>
            <div className={styles.central_block}>
                {/* <OrderIcons elem={elem}/> */}
            </div>
        </div>
    )
}

export default FeedOrder;
