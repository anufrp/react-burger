import React, { useReducer, useEffect, useState, useMemo, useRef } from "react";
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderItem from "../order-item/order-item";
import OrderDetails from "../order-details/order-details";
import ErrorMessage from "../error-message/error-message";
import EmptyOrderMessage from "../empty-order-message/empty-order-message";
import NoItem from "../no-item/no-item";
import Modal from '../modal/modal';
import ModalOverlay from "../modal-overlay/modal-overlay";
import Loader from "../loader/loader";
import { useSelector, useDispatch } from 'react-redux';
import { 
    processingOrder, 
    RESET_ORDER_MODAL_MODE,
    CLEAR_CONSTRUCTOR_LIST,
    CLEAR_ORDER_DETAILS,
    CLEAR_BUN
} from "../../services/actions/actions";
import { UPDATE_CONSTRUCTOR } from "../../services/actions/constructor";

const [SUCCESS, FAILED, EMPTY] = ['success', 'failed', 'empty'];

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

    const dispatch = useDispatch();
    
    const {constructorItems, bun, orderRequest, orderFailed, orderModalMode, orderDetails} = useSelector(store => 
        ({
            constructorItems: store.burger.constructorItems,
            bun: store.burger.bun,
            orderRequest: store.burger.orderRequest,
            orderFailed: store.burger.orderFailed,
            orderModalMode: store.burger.orderModalMode,
            orderDetails: store.burger.orderDetails
        }));

    const [orderSumState, orderSumDispatcher] = useReducer(orderSumReducer, orderSumInitialState, undefined);

    const [modalOverlayVisible, setModalOverlayVisible] = useState(false);

    const confirmOrder = () => {

        dispatch(processingOrder(constructorItems, bun));
 
    }
    const closeModal = () => {
        dispatch({type: RESET_ORDER_MODAL_MODE});
        if(!orderFailed) {
            dispatch({type: CLEAR_CONSTRUCTOR_LIST});
            dispatch({type: CLEAR_BUN});
            dispatch({type: CLEAR_ORDER_DETAILS});
        }
    }

    const moveCard = (dragIndex, hoverIndex) => {
        
        let newOrd = [...constructorItems];
        newOrd.splice(dragIndex, 1);
        newOrd.splice(hoverIndex, 0, constructorItems[dragIndex]);
        dispatch({type: UPDATE_CONSTRUCTOR, items: newOrd});
  
      };

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    useEffect(() => {
        const orderSum = constructorItems.reduce((sum, item) => sum + item.price, 0) + (bun._id ? bun.price * 2 : 0); //подсчет суммы ингредиентов
        orderSumDispatcher({type: "update", sum: orderSum});

    }, [constructorItems, bun]);

    return (
        <div className={`${styles.main} mt-25`}>
            <div ref={drop} className={styles.order}>
                { bun._id ? (<OrderItem item={bun} type="top" moveCard={()=>{}} />) : (<NoItem type="topbun" />) }
                { constructorItems.length > 0 ? (<div id={"selectedIngredients"} className={`${styles.ingredients} pr-2`}>
                    {constructorItems.map ((item, index) =>
                        <OrderItem key={item.uid} item={item} index={index} type="regular" moveCard={moveCard}/>
                    )}
                </div>) : (<NoItem type="ingredient" />) }
                { bun._id ? (<OrderItem item={bun} type="bottom" moveCard={()=>{}} />) : (<NoItem type="bottombun" />) }
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
                orderRequest && (<Loader />)
            }

            {            
                !orderRequest && orderModalMode != null && (
                        <Modal closeFunc={closeModal}>
                            {orderModalMode === FAILED && (<ErrorMessage>Попробуйте оформить заказ еще раз</ErrorMessage>)} 
                            {orderModalMode === SUCCESS && (<OrderDetails orderNumber={orderDetails.number} />)}                       
                            {orderModalMode === EMPTY && (<EmptyOrderMessage />)}   
                        </Modal>
            )}
            {
                modalOverlayVisible && <ModalOverlay />
            }
        </div>
    );
};
