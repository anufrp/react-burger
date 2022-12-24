import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { userReducer } from './user';


export const rootReducer = combineReducers({
  orderDetails: orderDetailsReducer,
  ingredients: ingredientsReducer,
  constructorItems: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  user: userReducer
});
