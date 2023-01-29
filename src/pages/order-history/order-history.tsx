import { FC, useEffect, useState } from 'react';
import OrderCard from '../../components/order-card/order-card';
import styles from './order-history.module.css';
import { useDispatch, useSelector } from '../../hooks';
import { connect as connectHistory, disconnect as disconnectHistory } from '../../services/actions/order-history';
import { hideModal, showModal } from '../../services/actions/feed';
import { ORDER_HISTORY_SERVER_URL } from '../../services/constants';
import { TOrder } from '../../utils/types';
import Modal from '../../components/modal/modal';
import Order from '../../components/orders-info/order/order';
import { getCookie } from '../../utils/cookie';
import { useHistory, useLocation } from "react-router-dom";

const OrderHistory: FC = () => {
    const history = useHistory();
    let location = useLocation();
  
  const dispatch = useDispatch();
  const [orderNumber, setOrderNumber] = useState(0);

  const accessToken = getCookie('accessToken');

  const API_URL = ORDER_HISTORY_SERVER_URL + `?token=${accessToken}`;
    
  const orders = useSelector(store => store.orderHistory.feed?.orders);
  const showOrderModal = useSelector(store => store.feed.showOrderModal);

  const openModal = (number: number) => {
      setOrderNumber(number);
      dispatch(showModal());
      history.push({ 
          pathname: '/profile/orders/' + number,
          state: { background: location }
       });
  }
      
  const closeModal = () => {
    history.push({ 
        pathname: '/profile/orders/',
        state: { background: location }
     });
    dispatch(hideModal())
  }

  useEffect(() => {
    dispatch(connectHistory(API_URL));
    return () => {
        if(showOrderModal === false) { 
          dispatch(disconnectHistory());
        }
    };
  }, [dispatch]);


  return(
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {orders?.map((item:TOrder)=>(
              <OrderCard key={item._id} order={item} onClickFunc={openModal}/>
          ))}
        </div>
      </div>
      
      {showOrderModal && (
              <Modal title="Детали заказа" closeFunc={closeModal}>
                  <Order orderId={orderNumber} />
              </Modal>
          )}
    </>
  );
}

export default OrderHistory;
