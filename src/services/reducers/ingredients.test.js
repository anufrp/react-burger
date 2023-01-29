import { ingredientsReducer as reducer, initialState } from './ingredients'  
import * as types from '../actions/ingredients'
import { testIngredient } from './constructor.test'

describe('ingredientDetails reducer', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle SET_INGREDIENTS_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.SET_INGREDIENTS_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          ingredientsRequest: true
      })
      )
    })
  
    it('should handle SET_INGREDIENTS_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.SET_INGREDIENTS_SUCCESS,
          items: [testIngredient]
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          ingredientsRequest: false,
          ingredientsFailed: false,
          ingredients: [testIngredient]
      })
      )
    })
  
    it('should handle SET_INGREDIENTS_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.SET_INGREDIENTS_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          ingredientsRequest: false,
          ingredientsFailed: true
      })
      )
    })

})
