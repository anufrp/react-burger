import { TIngredient } from "../../utils/types";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { 
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from "../actions/ingredient-details"

type TIngredientDetails = {
  ingredientDetails: TIngredient | null
}

const initialState: TIngredientDetails = {  
    ingredientDetails: null
  };

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetails => {
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
