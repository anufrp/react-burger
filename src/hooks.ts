import type {} from "redux-thunk/extend-redux";

import { AppDispatch, AppThunk, RootState } from '.'

import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch & AppThunk = dispatchHook;
