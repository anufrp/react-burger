import { TIngredient } from "../../utils/types";

export const SET_BUN: 'SET_BUN' = 'SET_BUN';
export const CLEAR_BUN: 'CLEAR_BUN' = 'CLEAR_BUN';

export const TOPUP_CONSTRUCTOR_LIST: 'TOPUP_CONSTRUCTOR_LIST' = 'TOPUP_CONSTRUCTOR_LIST';
export const REJECT_CONSTRUCTOR_LIST: 'REJECT_CONSTRUCTOR_LIST' = 'REJECT_CONSTRUCTOR_LIST';
export const CLEAR_CONSTRUCTOR_LIST: 'CLEAR_CONSTRUCTOR_LIST' = 'CLEAR_CONSTRUCTOR_LIST';

export const UPDATE_CONSTRUCTOR: 'UPDATE_CONSTRUCTOR' = 'UPDATE_CONSTRUCTOR';


export const SET_COST: 'SET_COST' = 'SET_COST';
export const CLEAR_COST: 'CLEAR_COST' = 'CLEAR_COST';


export type TSetBunAction = {
    readonly type: typeof SET_BUN;
    readonly item: TIngredient;
}

export type TClearBunAction = {
    readonly type: typeof CLEAR_BUN;
}

export type TTopUpConstructorAction = {
    readonly type: typeof TOPUP_CONSTRUCTOR_LIST;
    readonly item: TIngredient;
}

export type TRejectConstructorAction = {
    readonly type: typeof REJECT_CONSTRUCTOR_LIST;
    readonly item: TIngredient;
}

export type TClearConstructorAction = {
    readonly type: typeof CLEAR_CONSTRUCTOR_LIST;
}

export type TUpdateConstructorAction = {
    readonly type: typeof UPDATE_CONSTRUCTOR;
    readonly items: Array<TIngredient>;
}

export type TSetCostAction = {
    readonly type: typeof SET_COST;
}

export type TClearCostAction = {
    readonly type: typeof CLEAR_COST;
}

export type TConstructorActions = 
    | TSetBunAction
    | TClearBunAction
    | TTopUpConstructorAction
    | TRejectConstructorAction
    | TClearConstructorAction
    | TUpdateConstructorAction
    | TSetCostAction
    | TClearCostAction;

// Генераторы экшенов
export const setBun = (item: TIngredient): TSetBunAction => ({
    type: SET_BUN,
    item
});

export const topupConstructor = (item: TIngredient): TTopUpConstructorAction => ({
    type: TOPUP_CONSTRUCTOR_LIST,
    item
});

export const rejectConstructor = (item: TIngredient): TRejectConstructorAction => ({
    type: REJECT_CONSTRUCTOR_LIST,
    item
});

export const updateConstructor = (items: Array<TIngredient>): TUpdateConstructorAction => ({
    type: UPDATE_CONSTRUCTOR,
    items
});

