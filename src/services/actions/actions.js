import { getData } from "../../utils/get-data";
import {createOrder} from "../../utils/create-order";
import { API_BASE } from "../constants";

export const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED';

export const SET_BUN = 'SET_BUN';
export const CLEAR_BUN = 'CLEAR_BUN';

export const TOPUP_CONSTRUCTOR_LIST = 'TOPUP_CONSTRUCTOR_LIST';
export const REJECT_CONSTRUCTOR_LIST = 'REJECT_CONSTRUCTOR_LIST';
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const SET_ORDER_DETAILS_REQUEST = 'SET_ORDER_DETAILS_REQUEST';
export const SET_ORDER_DETAILS_SUCCESS = 'SET_ORDER_DETAILS_SUCCESS';
export const SET_ORDER_DETAILS_FAILED = 'SET_ORDER_DETAILS_FAILED';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';
export const SET_ORDER_MODAL_MODE = 'ORDER_MODAL_MODE';
export const RESET_ORDER_MODAL_MODE = 'RESET_ORDER_MODAL_MODE';

const [SUCCESS, FAILED, EMPTY, LOADING] = ['success', 'failed', 'empty', 'loading'];


export function getIngredients() {
    return function(dispatch) { 

      dispatch({
        type: SET_INGREDIENTS_REQUEST
      });

      getData(API_BASE + 'ingredients').then(res => {
        if (res && res.success) {

            setTimeout(() => {
                dispatch({
                    type: SET_INGREDIENTS_SUCCESS,
                    items: res.data
                });
            }, "2000") //имитация коннекшена
        } 
        else { 
            dispatch({type: SET_INGREDIENTS_FAILED});
        }
      });
    };
}

export function processingOrder(constructorItems, bun) {

    return function(dispatch) { 

        let orderIngredients = constructorItems.map(item => item._id); //ИДы ингредиентов в массив для получения номера заказа  
        orderIngredients = bun._id ? [...orderIngredients, bun._id] : orderIngredients; //добавить булку, если она есть

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
                    }, "2000") //имитация коннекшена
                    
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
