import React, { useEffect, useState } from "react";
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderItem from "../order-item/order-item";
import OrderDetails from "../order-details/order-details";
import ErrorMessage from "../error-message/error-message";
import EmptyOrderMessage from "../empty-order-message/empty-order-message";
import NoItem from "../no-item/no-item";
import Modal from '../modal/modal';
import Loader from "../loader/loader";
import { useSelector, useDispatch } from 'react-redux';
import { 
    processingOrder, 
    RESET_ORDER_MODAL_MODE,
    CLEAR_ORDER_DETAILS
} from "../../services/actions/order-details";
import { 
    UPDATE_CONSTRUCTOR, 
    CLEAR_CONSTRUCTOR_LIST,
    CLEAR_BUN,
    CLEAR_COST
 } from "../../services/actions/constructor";
import { getCookie } from "../../utils/cookie";
import { useHistory } from "react-router-dom";
import { TIngredient } from "../../utils/types";

const [SUCCESS, FAILED, EMPTY] = ['success', 'failed', 'empty'];

export default function BurgerConstructor() {

    const dispatch = useDispatch<any>();
    const history = useHistory(); 
    
    const [shouldUpdate, setShouldUpdate] = useState(true); //ререндер при добавлении компонентов, иначе не работает сортировка для последнего добавленного ингредиента :с
    
    const {constructorItems, bun, orderRequest, orderFailed, orderModalMode, orderDetails, cost} = useSelector((store: any) => 
        ({
            constructorItems: store.constructorItems.constructorItems,
            bun: store.constructorItems.bun,
            orderRequest: store.orderDetails.orderRequest,
            orderFailed: store.orderDetails.orderFailed,
            orderModalMode: store.orderDetails.orderModalMode,
            orderDetails: store.orderDetails.orderDetails,
            cost: store.constructorItems.cost
        }));

    const confirmOrder = () => {

        const accessToken = getCookie('accessToken');

        if(accessToken === undefined) { //если токена авторизации нет в куки - редиректим на логин
            history.push({ pathname: '/login' });
        }
        else
            dispatch(processingOrder(constructorItems, bun));
 
    }
    const closeModal = () => {
        dispatch({type: RESET_ORDER_MODAL_MODE});
        if(!orderFailed) {
            dispatch({type: CLEAR_CONSTRUCTOR_LIST});
            dispatch({type: CLEAR_BUN});
            dispatch({type: CLEAR_ORDER_DETAILS});
            dispatch({type: CLEAR_COST});
        }
    }

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        
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
            canDrop: monitor.canDrop()
        }),
    }));

    useEffect(() => {
        setShouldUpdate(!shouldUpdate); //изменить состояние для ререндеринга компонента, таким образом у дочерних OrderItem произовйдет ререндеринг и установится Ref
    },[constructorItems.length]);

    return (
        <div className={`${styles.main} mt-25`}>
            <div ref={drop} className={styles.order}>

                { bun._id ? (<OrderItem item={bun} type="top" moveCard={()=>{}} />) : (<NoItem type="topbun" />) }

                { constructorItems.length > 0 ? 
                    (<div id={"selectedIngredients"} className={`${styles.ingredients} pr-2`}>
                        {constructorItems.map ((item: TIngredient, index: number) =>
                            <OrderItem key={item.uid} item={item} index={index} type={undefined} moveCard={moveCard} />
                        )}
                    </div>) : 
                    (<NoItem type="ingredient" />) }

                { bun._id ? (<OrderItem item={bun} type="bottom" moveCard={()=>{}} />) : (<NoItem type="bottombun" />) }

            </div>

            <div className={`${styles.summary} mr-7`}>

                <div className={`${styles.price} text text_type_digits-medium mr-10`}>
                    <span> {cost} </span> <CurrencyIcon type="primary" />
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
        </div>
    );
};
