import { ingredientDetailsReducer as reducer, initialState } from './ingredient-details'  
import * as types from '../actions/ingredient-details'
import { testIngredient } from './constructor.test'

describe('ingredientDetails reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle SET_INGREDIENT_DETAILS', () => {
      expect(
        reducer(initialState, {
          type: types.SET_INGREDIENT_DETAILS,
          item: testIngredient
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          ingredientDetails: testIngredient
      })
      )
    })
  
    it('should handle CLEAR_INGREDIENT_DETAILS', () => {
      expect(
        reducer(initialState, {
          type: types.CLEAR_INGREDIENT_DETAILS
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          ingredientDetails: initialState.ingredientDetails
      })
      )
    })

})
