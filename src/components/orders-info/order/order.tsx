import { useEffect, FC } from 'react';
import styles from './order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from '../../../hooks';
import { connect as connectFeed, disconnect as disconnectFeed } from '../../../services/actions/feed'
import { connect as connectHistory, disconnect as disconnectHistory } from '../../../services/actions/order-history'
import { FEED_SERVER_URL, ORDER_HISTORY_SERVER_URL } from '../../../services/constants';
import { TIngredient, TOrder, WebsocketStatus } from '../../../utils/types';
import { getCookie } from '../../../utils/cookie';


type IOrderItem = {
    readonly id: string;
    count: number;
}
const accessToken = getCookie('accessToken');

const HISTORY_URL = ORDER_HISTORY_SERVER_URL + `?token=${accessToken}`;

export const Order: FC<{orderId?: number}> = ({orderId}) => {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    let order = null;
    let cost = 0;
    let orderItems: Array<IOrderItem> = [];

    const showModal = useSelector(store => store.feed.showOrderModal);
    const connectStatus = useSelector(
        store => (path.indexOf('feed') === -1) ? store.orderHistory.status : store.feed.status
    );

    useEffect(() => { console.log(path.indexOf('feed'), connectStatus);
        if(connectStatus === WebsocketStatus.OFFLINE)
            path.indexOf('feed') !== -1
                ? dispatch(connectFeed(FEED_SERVER_URL))
                : dispatch(connectHistory(HISTORY_URL))

        return () => {
            if(showModal === false) { 
                path.indexOf('feed') !== -1 
                    ? dispatch(disconnectFeed())
                    : dispatch(disconnectHistory())
            }
        };
    }, [dispatch]);

    const { id } = useParams<{id:string}>();
    const finallyId = !orderId ? id : orderId;
    const orders  = useSelector(
        store => (path.indexOf('feed') === -1) ? store.orderHistory.feed?.orders : store.feed.feed?.orders
    );

    const isDisconnected = connectStatus === WebsocketStatus.OFFLINE;    

    const items = useSelector(store => store.ingredients.ingredients);

    if (orders && orders.length > 0 && isDisconnected === false) {
        order = orders.find((item:TOrder) => item.number == finallyId)    
    }

    const status: string = (order && (order.status === 'done')) ?
        'Выполнен': (order && (order.status === 'pending')) ?
            'Создан'
            : (order && (order.status === 'created')) ?
                'Готовится'
                : 'Отменён';

    if(order !== null && order !== undefined) {
        order.ingredients.map((elem: string) => {
            let i = orderItems.findIndex((item) => item.id == elem);
            i === -1 ? orderItems = [...orderItems, {id: elem, count: 1}] : orderItems[i].count++;
        })
    }

    return (!isDisconnected ? (<>
        { order  ? (
            <div className={`${styles.wrapper} p-10`}>
                <p className={`${styles.number} text text_type_digits-default`}>#{finallyId}</p>
                <p className="text text_type_main-medium">{order.name}</p>
                <p className={`${styles.status} text text_type_main-default`}>{status}</p>
                <p className="text text_type_main-medium mt-5 mb-3">Состав:</p>
                <ul className={`${styles.ingredients} pr-2`}>
                    {orderItems.map((item,index) => {
                        const ingredient = (items != null) && items.find((product:TIngredient) => product._id === item.id);
                        if (ingredient) {
                            const price = ingredient.price;
                            const image = ingredient.image_large;
                            const name = ingredient.name;
                            cost += price * item.count;
                            return (
                                <li className={styles.list_item} key={index}>
                                    <div className={styles.order_info}>
                                        <div className={styles.img_item} style={{zIndex: 6}}>
                                            <img src={image} alt={name}/>
                                        </div>
                                        <p className="text text_type_main-default ml-4">{name}</p>
                                    </div>
                                    <div className={styles.price}>
                                        <span className="text text_type_digits-default mr-2">{item.count} x {price}</span>
                                        <CurrencyIcon type='primary'/>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
                <div className={`${styles.footer} mt-4`}>
                    <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
                    <p className={styles.price}>
                        <span className="text text_type_digits-default mr-2">{cost}</span>
                        <CurrencyIcon type='primary'/>
                    </p>
                </div>


            </div>
        ) : (
            <div className={styles.container}>
                <h1 className="text text_type_main-medium">Заказ не найден</h1>
            </div>
        )
        }
    </>
) : (
    <div className={styles.container}>
        <h1 className="text text_type_main-medium">Загрузка...</h1>
    </div>
)

);
};

export default Order;
