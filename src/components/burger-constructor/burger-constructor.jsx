import React, {useMemo, useState, useReducer, useContext, useEffect } from "react";
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderItem from "../order-item/order-item";
import OrderDetails from "../order-details/order-details";
import ErrorMessage from "../error-message/error-message";
import EmptyOrderMessage from "../empty-order-message/empty-order-message";
import NoItem from "../no-item/no-item";
import Modal from '../modal/modal';
import { IngredientContext, OrderSumContext } from "../../services/constructorContext";
import {createOrder} from "../../utils/create-order";
import { API_BASE } from "../../services/constants";
import Loader from "../loader/loader";

const API_URL = API_BASE + 'orders'

const BUN = 'bun';
const [SUCCESS, FAILED, EMPTY, LOADING] = ['success', 'failed', 'empty', 'loading'];

const orderSumInitialState = { sum: 0 };

function orderSumReducer(orderSumState, action) {
    switch (action.type) {
      case "update":
        return { sum: action.sum };
      case "reset":
        return orderSumInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

export default function BurgerConstructor() {

    const [orderNumber, setOrderNumber] = useState();
    const { constructorItemsState, constructorItemsDispatcher } = useContext(IngredientContext);
    const [orderSumState, orderSumDispatcher] = useReducer(orderSumReducer, orderSumInitialState, undefined);

    const ingredients = useMemo(() => constructorItemsState.items.filter((item) => item.type !== BUN), [constructorItemsState.items]);

    const buns = useMemo(() => constructorItemsState.items.filter((item) => item.type === BUN), [constructorItemsState.items]);

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState();

    const confirmOrder = () => {
        const orederIngredients = constructorItemsState.items.map(item => item._id); //ИДы ингредиентов в массив для получения номера заказа         
        setModalMode();

        if(orederIngredients.length > 0) {
            createOrder(API_URL, orederIngredients)
            .then((res) => {
                                setOrderNumber(res.order.number);
                                setModalMode(SUCCESS);
                                constructorItemsDispatcher({type: 'reset'});
            })
            .catch(error => {
                                console.log('Ошибка при получении данных: ' + error.message);
                                setModalMode(FAILED);
                            });
        }
        else {            
            setModalMode(EMPTY);
        }
        //если все четко, обновить номер заказа в стейт, показать модал с успешностью
        setShowModal(true);
        //если неудача, показать модал с ошибкой
    }
    const closeModal = () => {
        setShowModal(false);
        setOrderNumber('');
    }

    useEffect(() => {
        const orderSum = ingredients.reduce((sum, item) => sum + item.price, 0) + buns.reduce((sum, item) => sum + item.price, 0) * 2; //подсчет суммы ингредиентов
        orderSumDispatcher({type: "update", sum: orderSum});

    }, [constructorItemsState.items])

    return (
        <div className={`${styles.main} mt-25`}>
            <div className={styles.order}>
                { buns.length > 0 ? (<OrderItem item={buns[0]} type="top" />) : (<NoItem type="topbun" />) }
                { ingredients.length > 0 ? (<div className={`${styles.ingredients} pr-2`}>
                    {ingredients.map ((item) =>
                        <OrderItem key={item._id} item={item} type="regular" />
                    )}
                </div>) : (<NoItem type="ingredient" />) }
                { buns.length > 0 ? (<OrderItem item={buns[0]} type="bottom" />) : (<NoItem type="bottombun" />) }
            </div>

            <div className={`${styles.summary} mr-7`}>

                <div className={`${styles.price} text text_type_digits-medium mr-10`}>
                    <span> {orderSumState.sum} </span> <CurrencyIcon type="primary" />
                </div>

                <div className='text text_type_main-medium'>
                    <Button type="primary" size="medium" onClick={confirmOrder} htmlType="button" >
                        Оформить заказ
                    </Button>
                </div>

            </div>

            {
                showModal && modalMode === undefined && (<Loader />)
            }

            {            
                showModal && modalMode !== LOADING && modalMode !== undefined && (
                        <Modal closeFunc={closeModal}>
                            {modalMode === FAILED && (<ErrorMessage />)} 
                            {modalMode === SUCCESS && (<OrderDetails orderNumber={orderNumber} />)}                       
                            {modalMode === EMPTY && (<EmptyOrderMessage />)}   
                        </Modal>
            )}
        </div>
    );
};
