import { TIngredient } from '../../utils/types';
import { TConstructorActions } from '../actions/constructor';
import { 
    SET_BUN,
    CLEAR_BUN,

    TOPUP_CONSTRUCTOR_LIST,
    REJECT_CONSTRUCTOR_LIST,
    CLEAR_CONSTRUCTOR_LIST,

    UPDATE_CONSTRUCTOR,

    SET_COST,
    CLEAR_COST
} from '../actions/constructor';

export type TConstructorState = {
    bun: TIngredient | null,
    constructorItems: Array<TIngredient>,
    cost: Number
}

const initialState: TConstructorState = {  
    bun: null,
    constructorItems: [],
    cost: 0
};

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
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

    case UPDATE_CONSTRUCTOR:
        return { ...state, constructorItems: action.items }

    case SET_COST:
        if(state.bun !== null)
            return { ...state, cost: state.constructorItems.reduce((sum, item) => sum + item.price, 0) + (state.bun._id ? state.bun.price * 2 : 0) }
        else
            return { ...state, cost: state.constructorItems.reduce((sum, item) => sum + item.price, 0) }

    case CLEAR_COST:
        return { ...state, cost: initialState.cost }

    default: {
      return state;
    }
  }
};
