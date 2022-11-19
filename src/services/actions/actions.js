import { getData } from "../../utils/get-data";
import { API_BASE } from "../constants";

export const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED';
export const SET_BUN = 'SET_BUN';
export const TOPUP_CONSTRUCTOR_LIST = 'TOPUP_CONSTRUCTOR_LIST';
export const REJECT_CONSTRUCTOR_LIST = 'REJECT_CONSTRUCTOR_LIST';
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST';
export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';


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
              }, "2000")

          
        } else { 
          dispatch({
            type: SET_INGREDIENTS_FAILED
          });
        }
      });
    };
  }
