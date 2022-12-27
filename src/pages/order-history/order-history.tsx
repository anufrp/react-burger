import { FC } from 'react';
import styles from './order-history.module.css';

const OrderHistory: FC = () => {

    
    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <p className="text text_type_main-medium pb-6" >
                Скоро здесь будет история заказов
            </p>
        </div>
    </div>
  );
} 

export default OrderHistory;
