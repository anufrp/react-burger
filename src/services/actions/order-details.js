import {createOrder} from "../../utils/create-order";
import { API_BASE } from "../constants";

export const SET_ORDER_DETAILS_REQUEST = 'SET_ORDER_DETAILS_REQUEST';
export const SET_ORDER_DETAILS_SUCCESS = 'SET_ORDER_DETAILS_SUCCESS';
export const SET_ORDER_DETAILS_FAILED = 'SET_ORDER_DETAILS_FAILED';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';
export const SET_ORDER_MODAL_MODE = 'ORDER_MODAL_MODE';
export const RESET_ORDER_MODAL_MODE = 'RESET_ORDER_MODAL_MODE';

const [SUCCESS, FAILED, EMPTY] = ['success', 'failed', 'empty'];

export function processingOrder(constructorItems, bun) {

    return function(dispatch) { 

        let orderIngredients = constructorItems.map(item => item._id); //ИДы ингредиентов в массив для получения номера заказа  
        orderIngredients = bun._id ? [bun._id, ...orderIngredients, bun._id] : orderIngredients; //добавить булку, если она есть

        if(orderIngredients.length > 0) {

            dispatch({type: SET_ORDER_DETAILS_REQUEST});

            createOrder(API_BASE + 'orders', orderIngredients).then(res => {
                if (res && res.success) {
        
                    setTimeout(() => {
                        dispatch({
                            type: SET_ORDER_DETAILS_SUCCESS,
                            order: res.order
                        });
                        dispatch({type: SET_ORDER_MODAL_MODE, mode: SUCCESS});
                    }, "1000") //имитация коннекшена
                    
                }
                else { 
                    dispatch({type: SET_ORDER_DETAILS_FAILED});
                    dispatch({type: SET_ORDER_MODAL_MODE, mode: FAILED});
                }
            });
        }
        else {
            dispatch({type: SET_ORDER_MODAL_MODE, mode: EMPTY});
        }

    };
}
