import { getData } from "../../utils/get-data";
import { API_BASE } from "../constants";
import { TIngredient } from "../../utils/types";

export const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED';

type TResponseIngredients = {
  success: boolean,
  data: Array<TIngredient>
}

export function getIngredients() {
    return function(dispatch: any) { 

      dispatch({
        type: SET_INGREDIENTS_REQUEST
      });

      getData<TResponseIngredients>(API_BASE + 'ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch({
              type: SET_INGREDIENTS_SUCCESS,
              items: res.data
          });
        } 
        else { 
          dispatch({type: SET_INGREDIENTS_FAILED});
        }
      })
      .catch((error) => {
          console.error("Ошибка при выполнении запроса!", error); 
          dispatch({type: SET_INGREDIENTS_FAILED});       
      });
    };
}
