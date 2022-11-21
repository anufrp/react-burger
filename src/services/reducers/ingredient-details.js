
import { 
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from "../actions/ingredient-details"

const initialState = {  
    ingredientDetails: {}
  };

export const ingredientDetailsReducer = (state = initialState, action) => {
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
