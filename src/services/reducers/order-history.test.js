import { historyReducer as reducer, initialState } from './order-history'
import * as types from '../actions/order-history'
import { WebsocketStatus } from "../../utils/types"

const testFeed = { "success": true, "orders": [{ "_id": "63d03bdb936b17001be53624", "ingredients": ["60d3b41abdacab0026a733c7"], "status": "done", "name": "Флюоресцентный бургер", "createdAt": "2023-01-24T20:13:15.637Z", "updatedAt": "2023-01-24T20:13:16.098Z", "number": 37802 }], "total": 37711, "totalToday": 95 }

describe('feed reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle wsConnecting', () => {
        expect(
            reducer(initialState, {
                type: types.wsConnecting
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                status: WebsocketStatus.CONNECTING
            })
        )
    })

    it('should handle wsOpen', () => {
        expect(
            reducer(initialState, {
                type: types.wsOpen
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                status: WebsocketStatus.ONLINE,
                connectionError: ''
            })
        )
    })

    it('should handle wsClose', () => {
        expect(
            reducer(initialState, {
                type: types.wsClose
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                status: WebsocketStatus.OFFLINE
            })
        )
    })

    it('should handle wsError', () => {
        expect(
            reducer(initialState, {
                type: types.wsError,
                payload: 'error text'
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                connectionError: 'error text'
            })
        )
    })

    it('should handle wsMessage', () => {
        expect(
            reducer(initialState, {
                type: types.wsMessage,
                payload: testFeed
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                feed: testFeed
            })
        )
    })

})  
