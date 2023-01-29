import React, { FC } from 'react';
import Order from '../../components/orders-info/order/order';
import styles from './order-page.module.css';

const OrderPage: FC = () => {
    
  return (
    <div className={`${styles.wrapper} mt-10`}>
        <span className="text text_type_main-large">Детали заказа</span>
        <div className={styles.content}>
            <Order />
        </div>
    </div>
  );
} 

export default OrderPage;
