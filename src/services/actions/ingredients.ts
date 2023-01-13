import { getData } from "../../utils/get-data";
import { API_BASE } from "../constants";
import { TIngredient } from "../../utils/types";
import { AppDispatch, AppThunk } from "../..";

export const SET_INGREDIENTS_REQUEST: 'SET_INGREDIENTS_REQUEST' = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS: 'SET_INGREDIENTS_SUCCESS' = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED: 'SET_INGREDIENTS_FAILED' = 'SET_INGREDIENTS_FAILED';

export type TSetIngredientsAction = {
  readonly type: typeof SET_INGREDIENTS_REQUEST;
}

export type TSetIngredientsSuccessAction = {
  readonly type: typeof SET_INGREDIENTS_SUCCESS;
  readonly items: Array<TIngredient>;
}

export type TSetIngredientsFailedAction = {
  readonly type: typeof SET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = 
    | TSetIngredientsAction
    | TSetIngredientsSuccessAction
    | TSetIngredientsFailedAction;

// Генераторы экшенов
export const setIngrediensSuccess = (items: Array<TIngredient>): TSetIngredientsSuccessAction => ({
  type: SET_INGREDIENTS_SUCCESS,
  items
});

type TResponseIngredients = {
  success: boolean,
  data: Array<TIngredient>
}


export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => { 

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
