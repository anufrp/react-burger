import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { TConstructorActions } from './services/actions/constructor';
import { TIngredientDetailsActions } from './services/actions/ingredient-details';
import { TIngredientsActions } from './services/actions/ingredients';
import { TOrderDetailsActions } from './services/actions/order-details';
import { TUserActions } from './services/actions/user';

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>; 

export type TApplicationActions =  | TConstructorActions
                            | TIngredientDetailsActions
                            | TIngredientsActions
                            | TOrderDetailsActions
                            | TUserActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 
//export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
