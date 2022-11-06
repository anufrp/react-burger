import React from "react";
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderItem from "../order-item/order-item";
import OrderDetails from "../order-details/order-details";
import Modal from '../modal/modal';
import PropTypes from "prop-types";

export default function BurgerConstructor({items}) {


    let ingredients = items.filter((item) => item.type != 'bun');

    let buns = items.filter((item) => item.type == 'bun');
    let bunId = parseInt(Math.random()*2);

    let orderSum = items.reduce((sum, item) => sum + item.price, 0);

    let [showModal, setShowModal] = React.useState(false);

    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className={`${styles.main} mt-25`}>
            <div className={styles.order}>
                <OrderItem item={buns[bunId]} type="top" />
                <div className={`${styles.ingredients} pr-2`}>
                    {ingredients.map ((item) =>
                        <OrderItem key={item._id} item={item} />
                    )}
                </div>
                <OrderItem item={buns[bunId]} type="bottom" />
            </div>

            <div className={`${styles.summary} mr-7`}>

                <div className={`${styles.price} text text_type_digits-medium mr-10`}>
                    <span> {orderSum} </span> <CurrencyIcon type="primary" />
                </div>

                <div className='text text_type_main-medium'>
                    <Button type="primary" size="medium" onClick={openModal} htmlType="button" >
                        Оформить заказ
                    </Button>
                </div>

            </div>

            {showModal && (
                    <Modal closeFunc={closeModal}>
                        <OrderDetails />
                    </Modal>
            )}
        </div>
    );
};

BurgerConstructor.propTypes = {
    items: PropTypes.array.isRequired
};
