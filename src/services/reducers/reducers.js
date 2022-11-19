import { combineReducers } from 'redux';

import { 
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_FAILED,
    SET_BUN,
    TOPUP_CONSTRUCTOR_LIST,
    REJECT_CONSTRUCTOR_LIST,
    CLEAR_CONSTRUCTOR_LIST,
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS,
    SET_ORDER_DETAILS,
    CLEAR_ORDER_DETAILS 
} from "../actions/actions"

const initialState = {  
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    bun: {},
    constructor: [],

    ingredientDetails: {},

    orderDetails: {}
  };

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          ingredientsRequest: true
        };
    }
    case SET_INGREDIENTS_SUCCESS: {
        return { ...state, ingredientsFailed: false, ingredients: action.items, ingredientsRequest: false };
    }
    case SET_INGREDIENTS_FAILED: {
        return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case SET_INGREDIENT_DETAILS:
        return {...state, ingredientDetails: action.item}

    case CLEAR_INGREDIENT_DETAILS: 
        return {...state, ingredientDetails: initialState.ingredientDetails}

    case SET_BUN:
        return {...state, bun: action.item}

    case TOPUP_CONSTRUCTOR_LIST: 
        return {...state, constructor: [...state.constructor, action.item]}  

    case CLEAR_CONSTRUCTOR_LIST: 
        return {...state, constructor: initialState.constructor}    

    case CLEAR_ORDER_DETAILS: 
        return {...state, orderDetails: initialState.orderDetails}

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  burger: burgerReducer,
});
