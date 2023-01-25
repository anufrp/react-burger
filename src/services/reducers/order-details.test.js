import { orderDetailsReducer as reducer, initialState } from './order-details'  
import * as types from '../actions/order-details'

const testOrder = {
    number: 1234
}

describe('ingredientDetails reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
  
    it('should handle SET_ORDER_DETAILS_REQUEST', () => {
        expect(
          reducer(initialState, {
            type: types.SET_ORDER_DETAILS_REQUEST
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState,
            orderRequest: true
        })
        )
      })
    
      it('should handle SET_ORDER_DETAILS_SUCCESS', () => {
        expect(
          reducer(initialState, {
            type: types.SET_ORDER_DETAILS_SUCCESS,
            order: testOrder
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState,
            orderRequest: false,
            orderFailed: false,
            orderDetails: testOrder
        })
        )
      })
    
      it('should handle SET_ORDER_DETAILS_FAILED', () => {
        expect(
          reducer(initialState, {
            type: types.SET_ORDER_DETAILS_FAILED
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState,
            orderRequest: false,
            orderFailed: true
        })
        )
      })
    
      it('should handle CLEAR_ORDER_DETAILS', () => {
        expect(
          reducer(initialState, {
            type: types.CLEAR_ORDER_DETAILS
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState
        })
        )
      })
    
      it('should handle SET_ORDER_MODAL_MODE', () => {
        expect(
          reducer(initialState, {
            type: types.SET_ORDER_MODAL_MODE,
            mode: 'some modal mode'
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState,
            orderModalMode: 'some modal mode'
        })
        )
      })
    
      it('should handle RESET_ORDER_MODAL_MODE', () => {
        expect(
          reducer(initialState, {
            type: types.RESET_ORDER_MODAL_MODE
          })
        ).toEqual(      
          expect.objectContaining({
            ...initialState
        })
        )
      })

})
