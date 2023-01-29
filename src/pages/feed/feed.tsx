import { FC, useEffect, useState } from 'react';
import styles from './feed.module.css';
import { FEED_SERVER_URL } from '../../services/constants';
import { useSelector, useDispatch } from '../../hooks';
import { connect as connectFeed, disconnect as disconnectFeed, hideModal, showModal } from '../../services/actions/feed';
import { TOrder, TOrdersStatus, WebsocketStatus } from '../../utils/types';
import Modal from '../../components/modal/modal';
import OrderCard from '../../components/order-card/order-card';
import OrdersInfo from '../../components/orders-info/orders-info';
import Order from '../../components/orders-info/order/order';
import { useHistory, useLocation } from "react-router-dom";

const Feed: FC = () => {
    const history = useHistory();
    let location = useLocation()

    const dispatch = useDispatch();
    const { feed, status, showOrderModal } = useSelector(state => state.feed);
    const isDisconnected = status === WebsocketStatus.OFFLINE;

    const [orderNumber, setOrderNumber] = useState(0);

    const connect = () => dispatch(connectFeed(FEED_SERVER_URL));
    const disconnect = () => dispatch(disconnectFeed());

    let initState: TOrdersStatus = {
        created: [],
        pending: [],
        done:[]
    };

    const [ordersStatuses, setOrderStatuses] = useState(initState);
    
    function fillStatuses (): TOrdersStatus {
        let orderStatuses: TOrdersStatus = initState;
        feed?.orders.map((order : TOrder) => {
            if (order.status === 'created') orderStatuses.created = [...orderStatuses.created, order.number];
            else if (order.status === 'pending') orderStatuses.pending = [...orderStatuses.pending, order.number];
            else orderStatuses.done = [...orderStatuses.done, order.number];
        })
        return orderStatuses;
    }

    const showOrder = (number: number) => {
        setOrderNumber(number);
        dispatch(showModal());
        
        history.push({ 
            pathname: '/feed/' + number,
            state: { background: location }
         });
    }
    
    const closeModal = () => {
        history.push({ 
            pathname: '/feed',
            state: { background: location }
         });
        dispatch(hideModal())
    }
    
    useEffect(() => { 
        if(status === WebsocketStatus.OFFLINE) connect();
        return(() => {
            if(showOrderModal === false) disconnect(); 
        })
    }, [dispatch])

    useEffect(() => {
        if(!isDisconnected)
            setOrderStatuses(fillStatuses());
    }, [feed])

    return (
        <div className={`${styles.wrapper}`}>
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={`${styles.header}`}><h1 className="text text_type_main-large">Лента заказов</h1></div>
                    <div className={`${styles.orders}`}>
                        {feed?.orders.map((order:TOrder)=>{
                            return (<OrderCard key={order._id} order={order} onClickFunc={showOrder}/>)
                        })}
                    </div>
                </div>
                <div className={`${styles.content} mt-8`}>
                    <OrdersInfo total={feed?.total} totalToday={feed?.totalToday} statuses={ordersStatuses}/>
                </div>
            </main>
            {showOrderModal && (
                <Modal title="Детали заказа" closeFunc={closeModal}>
                    <Order orderId={orderNumber} />
                </Modal>
            )}
        </div>
    )
} 

export default Feed;
