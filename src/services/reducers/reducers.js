import { combineReducers } from 'redux';

import { 
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_FAILED,

    SET_BUN,
    CLEAR_BUN,

    TOPUP_CONSTRUCTOR_LIST,
    REJECT_CONSTRUCTOR_LIST,
    CLEAR_CONSTRUCTOR_LIST,

    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS,

    SET_ORDER_DETAILS_REQUEST,
    SET_ORDER_DETAILS_SUCCESS,
    SET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS,
    SET_ORDER_MODAL_MODE,
    RESET_ORDER_MODAL_MODE
} from "../actions/actions"

import { UPDATE_CONSTRUCTOR } from '../actions/constructor';

const initialState = {  
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    bun: {},
    constructorItems: [],

    ingredientDetails: {},

    orderDetails: {
        number: null
    },
    orderRequest: false,
    orderFailed: false,

    orderModalMode: null
  };

const burgerReducer = (state = initialState, action) => {
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
    case SET_INGREDIENT_DETAILS:
        return { ...state, ingredientDetails: action.item }

    case CLEAR_INGREDIENT_DETAILS: 
        return { ...state, ingredientDetails: initialState.ingredientDetails }

    case SET_BUN:
        return { ...state, bun: action.item }

    case CLEAR_BUN:
        return { ...state, bun: initialState.bun }

    case TOPUP_CONSTRUCTOR_LIST: 
        return { ...state, constructorItems: [...state.constructorItems, action.item] }  

    case REJECT_CONSTRUCTOR_LIST: 
        return { ...state, constructorItems: state.constructorItems.filter((constrItem) => constrItem.uid !== action.item.uid) }  

    case CLEAR_CONSTRUCTOR_LIST: 
        return { ...state, constructorItems: initialState.constructorItems }    

    case SET_ORDER_DETAILS_REQUEST: 
        return {...state, orderRequest: true};

    case SET_ORDER_DETAILS_SUCCESS: 
        return { ...state, orderFailed: false, orderDetails:  action.order, orderRequest: false };

    case SET_ORDER_DETAILS_FAILED: 
        return { ...state, orderFailed: true, orderRequest: false };

    case CLEAR_ORDER_DETAILS: 
        return { ...state, orderDetails: initialState.orderDetails }

    case SET_ORDER_MODAL_MODE: 
        return { ...state, orderModalMode: action.mode }

    case RESET_ORDER_MODAL_MODE: 
        return { ...state, orderModalMode: initialState.orderModalMode }

    case UPDATE_CONSTRUCTOR:
        return { ...state, constructorItems: action.items}

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  burger: burgerReducer,
});
