import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import { 
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_FAILED,
} from "../actions/ingredients"

type TIngrediensState = {
  ingredients: Array<TIngredient>,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean
}

const initialState: TIngrediensState = {  
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
  };

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngrediensState => {
  switch (action.type) {
    case SET_INGREDIENTS_REQUEST: {
        return {...state, ingredientsRequest: true};
    }
    case SET_INGREDIENTS_SUCCESS: {
        return { ...state, ingredientsFailed: false, ingredients: action.items, ingredientsRequest: false };
    }
    case SET_INGREDIENTS_FAILED: {
        return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};

