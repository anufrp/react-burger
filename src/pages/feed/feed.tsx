import { FC, useEffect } from 'react';
import styles from './feed.module.css';
import { FEED_SERVER_URL } from '../../services/constants';
import { useSelector, useDispatch } from '../../hooks';
import { connect as connectFeed, disconnect as disconnectFeed } from '../../services/actions/feed';
import { TOrder, TOrdersStatus, WebsocketStatus } from '../../utils/types';
import Modal from '../../components/modal/modal';
import FeedOrder from '../../components/feed-order/feed-order';

const Feed: FC = () => {

    const dispatch = useDispatch();
    const { feed, status } = useSelector(state => state.feed);
    const isDisconnected = status === WebsocketStatus.OFFLINE;

    const connect = () => dispatch(connectFeed(FEED_SERVER_URL));
    const disconnect = () => dispatch(disconnectFeed());
    
    const ordersStatuses: any = () => {
        let orderStatuses: TOrdersStatus = {
            created: [],
            pending: [],
            done:[]
        };
        if(feed) {
            if(feed.orders?.length > 0  ) {
                feed.orders.map((order : TOrder) => {
                    if (order.status === 'created') orderStatuses.created = [...orderStatuses.created, order.number];
                    else if (order.status === 'pending') orderStatuses.pending = [...orderStatuses.pending, order.number];
                    else orderStatuses.done = [...orderStatuses.done, order.number];
                })
            }
        }

        return orderStatuses;
    }

    const setOrderNumber = (number: number) => {
        // dispatch({
        //     type: GET_CURRENT_ORDER_ID,
        //     data: number
        // })
        window.history.pushState(null,'','/feed/' + number);
    }

    useEffect(() => {
        connect();
        return(() => {
            disconnect(); 
        })
    }, [dispatch])

    return (
        <div>
            <main>
                {false && (
                    <Modal title="Детали заказа" closeFunc={ ()=>{} }>
                        {/* <FeedId/> */}
                        Детали заказа
                    </Modal>
                )}
                <h1 className="text text_type_main-large">Лента заказов</h1>
                <div className={styles.Wrapper}>
                    <section className={styles.column}>
                        {feed?.orders.map((elem:TOrder)=>{
                            return (<FeedOrder key={elem._id} elem={elem} onClick={setOrderNumber}/>)
                            //return(<> Заказ {elem.number}</>)
                        })}
                    </section>
                    <section className={styles.mainContentBlock}>
                        {/* <FeedInfo completeAll={completeAll} completeToday={completeToday} statuses={ordersStatuses}/> */}
                        FeedInfo completeAll={feed?.total} completeToday={feed?.totalToday} statuses={ordersStatuses}
                    </section>
                </div>
            </main>
        </div>
    )
} 

export default Feed;
