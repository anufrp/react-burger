import { TIngredient } from "../../utils/types";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS: 'CLEAR_INGREDIENT_DETAILS' = 'CLEAR_INGREDIENT_DETAILS';

export type TSetIngredientDetailsAction = {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly item: TIngredient;
}

export type TClearIngredientDetailsAction = {
    readonly type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
    | TSetIngredientDetailsAction
    | TClearIngredientDetailsAction;

// Генераторы экшенов
export const setIngredientDetails = (item: TIngredient): TSetIngredientDetailsAction => ({
    type: SET_INGREDIENT_DETAILS,
    item
});
