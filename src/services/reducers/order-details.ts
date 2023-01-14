import { TOrder, TOrderDetailsActions } from "../actions/order-details";
import { 
    SET_ORDER_DETAILS_REQUEST,
    SET_ORDER_DETAILS_SUCCESS,
    SET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS,
    SET_ORDER_MODAL_MODE,
    RESET_ORDER_MODAL_MODE
} from "../actions/order-details"

export type TOrderDetailsState = {
    orderDetails: TOrder,
    orderRequest: boolean,
    orderFailed: boolean,

    orderModalMode: string | null,

    loginRequired: boolean
}

const initialState: TOrderDetailsState = {  
    orderDetails: {
        number: null
    },
    orderRequest: false,
    orderFailed: false,

    orderModalMode: null,

    loginRequired: false
  };

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderDetailsState => {
  switch (action.type) {

    case SET_ORDER_DETAILS_REQUEST: 
        return {...state, orderRequest: true};

    case SET_ORDER_DETAILS_SUCCESS: 
        return { ...state, orderFailed: false, orderDetails:  action.order, orderRequest: false };

    case SET_ORDER_DETAILS_FAILED: 
        return { ...state, orderFailed: true, orderRequest: false };

    case CLEAR_ORDER_DETAILS: 
        return { ...state, orderDetails: initialState.orderDetails };

    case SET_ORDER_MODAL_MODE: 
        return { ...state, orderModalMode: action.mode };

    case RESET_ORDER_MODAL_MODE: 
        return { ...state, orderModalMode: initialState.orderModalMode };

    default: {
      return state;
    }
  }
};
