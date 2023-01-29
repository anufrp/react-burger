import { TIngredient } from "../../utils/types";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { 
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from "../actions/ingredient-details"

export type TIngredientDetailsState = {
  ingredientDetails: TIngredient | null
}

export const initialState: TIngredientDetailsState = {  
    ingredientDetails: null
  };

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
        return { ...state, ingredientDetails: action.item }

    case CLEAR_INGREDIENT_DETAILS: 
        return { ...state, ingredientDetails: initialState.ingredientDetails } 

    default: {
      return state;
    }
  }
};
