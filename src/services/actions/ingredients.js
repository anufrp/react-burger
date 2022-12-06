import { getData } from "../../utils/get-data";
import { API_BASE } from "../constants";

export const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED';

export function getIngredients() {
    return function(dispatch) { 

      dispatch({
        type: SET_INGREDIENTS_REQUEST
      });

      getData(API_BASE + 'ingredients')
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
