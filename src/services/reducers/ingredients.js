import { 
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_FAILED,
} from "../actions/ingredients"

const initialState = {  
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
  };

export const ingredientsReducer = (state = initialState, action) => {
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

