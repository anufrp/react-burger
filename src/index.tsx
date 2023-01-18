import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware, Middleware } from 'redux';
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
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Action, ActionCreator } from 'redux';
import { TOrderDetailsState } from './services/reducers/order-details';
import { TIngrediensState } from './services/reducers/ingredients';
import { TConstructorState } from './services/reducers/constructor';
import { TIngredientDetailsState } from './services/reducers/ingredient-details';
import { TUserState } from './services/reducers/user';
import { TFeedStore } from './services/reducers/feed';
import { socketMiddleware } from './services/middleware/socketMiddleware';

import { 
  connect as FeedWsConnect,
  disconnect as FeedWsDisconnect,
  wsOpen as FeedWsOpen,
  wsClose as FeedWsClose,
  wsMessage as FeedWsMessage,
  wsError as FeedWsError,
  wsConnecting as FeedWsConnecting
 } from './services/actions/feed'

 import { 
  connect as HistoryWsConnect,
  disconnect as HistoryWsDisconnect,
  wsOpen as HistoryWsOpen,
  wsClose as HistoryWsClose,
  wsMessage as HistoryWsMessage,
  wsError as HistoryWsError,
  wsConnecting as HistoryWsConnecting
 } from './services/actions/order-history'
import { THistoryStore } from './services/reducers/order-history';


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

const feedMiddleware: Middleware = socketMiddleware({
  wsConnect: FeedWsConnect,
  wsDisonnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage
})

const orderHistoryMiddleware: Middleware = socketMiddleware({
  wsConnect: HistoryWsConnect,
  wsDisonnect: HistoryWsDisconnect,
  wsConnecting: HistoryWsConnecting,
  onOpen: HistoryWsOpen,
  onClose: HistoryWsClose,
  onError: HistoryWsError,
  onMessage: HistoryWsMessage
})

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware, orderHistoryMiddleware));

const store = createStore(rootReducer, enhancer);

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(feedMiddleware);
//   }
// });

export type TStore = {
  orderDetails: TOrderDetailsState,
  ingredients: TIngrediensState,
  constructorItems: TConstructorState,
  ingredientDetails: TIngredientDetailsState,
  user: TUserState,
  feed: TFeedStore,
  orderHistory: THistoryStore
}

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

export type AppDispatch<TReturnType = void> = (
  action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;

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
