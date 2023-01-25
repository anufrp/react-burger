import { constructorReducer as reducer, initialState } from './constructor'  
import * as types from '../actions/constructor'

export const testIngredient = {
  "_id": "60d3b41abdacab0026a733c6",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
}

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_BUN', () => {
    expect(
      reducer(initialState, {
        type: types.SET_BUN,
        item: testIngredient
      })
    ).toEqual(      
      expect.objectContaining({
        ...initialState,
        bun: testIngredient
    })
    )
  })

    it('should handle CLEAR_BUN', () => {
      expect(
        reducer(initialState, {
          type: types.CLEAR_BUN
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          bun: null
      })
      )
    })

    it('should handle TOPUP_CONSTRUCTOR_LIST', () => {
      expect(
        reducer(initialState, {
          type: types.TOPUP_CONSTRUCTOR_LIST,
          item: testIngredient
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          constructorItems: [...initialState.constructorItems, testIngredient]
      })
      )
    })

    it('should handle REJECT_CONSTRUCTOR_LIST', () => {
      expect(
        reducer(initialState, {
          type: types.REJECT_CONSTRUCTOR_LIST,
          item: testIngredient
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          constructorItems: [...initialState.constructorItems]
      })
      )
    })

    it('should handle CLEAR_CONSTRUCTOR_LIST', () => {
      expect(
        reducer(initialState, {
          type: types.CLEAR_CONSTRUCTOR_LIST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          constructorItems: []
      })
      )
    })

    it('should handle UPDATE_CONSTRUCTOR', () => {
      expect(
        reducer(initialState, {
          type: types.UPDATE_CONSTRUCTOR,
          items: [testIngredient]
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          constructorItems: [testIngredient]
      })
      )
    })

    it('should handle SET_COST', () => {
      expect(
        reducer({...initialState, bun: testIngredient}, {
          type: types.SET_COST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          bun: testIngredient,        
          cost: 2510
      })
      )
    })

    it('should handle CLEAR_COST', () => {
      expect(
        reducer({...initialState}, {
          type: types.CLEAR_COST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,      
          cost: 0
      })
      )
    })

}) 
