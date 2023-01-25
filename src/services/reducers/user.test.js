import { userReducer as reducer, initialState } from './user'  
import * as types from '../actions/user'

const testUser = {
    email: 'user email',
    name: 'user name'
}

const testData = {
    user: testUser
}

describe('ingredientDetails reducer', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle REGISTER_USER_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.REGISTER_USER_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          registerUserRequest: true
      })
      )
    })
  
    it('should handle REGISTER_USER_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.REGISTER_USER_SUCCESS,
          data: testData
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          registerUserRequest: false,
          registerUserFailed: false,
          user: testUser
      })
      )
    })
  
    it('should handle REGISTER_USER_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.REGISTER_USER_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          registerUserRequest: false,
          registerUserFailed: true
      })
      )
    })

  
    it('should handle CHEK_EMAIL_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.CHEK_EMAIL_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          forgotEmailCheckRequest: true
      })
      )
    })
  
    it('should handle CHEK_EMAIL_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.CHEK_EMAIL_SUCCESS,
          forgotEmailCheck: true
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          forgotEmailCheckRequest: false,
          forgotEmailCheckFailed: false,
          forgotEmailCheck: true
      })
      )
    })
  
    it('should handle CHEK_EMAIL_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.CHEK_EMAIL_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          forgotEmailCheckRequest: false,
          forgotEmailCheckFailed: true
      })
      )
    })
  
    it('should handle DROP_CHEK_EMAIL_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_CHEK_EMAIL_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          forgotEmailCheckRequest: false,
          forgotEmailCheckFailed: false
      })
      )
    })

  
    it('should handle RESET_PASSWORD_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.RESET_PASSWORD_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          resetPasswordRequest: true
      })
      )
    })
  
    it('should handle RESET_PASSWORD_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.RESET_PASSWORD_SUCCESS,
          passwordReseted: true
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          resetPasswordRequest: false,
          resetPasswordFailed: false,
          passwordReseted: true
      })
      )
    })
  
    it('should handle RESET_PASSWORD_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.RESET_PASSWORD_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          resetPasswordRequest: false,
          resetPasswordFailed: true
      })
      )
    })
  
    it('should handle DROP_RESET_PASSWORD_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_RESET_PASSWORD_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          resetPasswordRequest: false,
          resetPasswordFailed: false
      })
      )
    })

  
    it('should handle LOGIN_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.LOGIN_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          loginRequest: true
      })
      )
    })
  
    it('should handle LOGIN_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.LOGIN_SUCCESS,
          data: testData
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          loginRequest: false,
          loginFailed: false,
          user: testUser
      })
      )
    })
  
    it('should handle LOGIN_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.LOGIN_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          loginRequest: false,
          loginFailed: true
      })
      )
    })
  
    it('should handle DROP_LOGIN_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_LOGIN_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          loginRequest: false,
          loginFailed: false
      })
      )
    })

  
    it('should handle LOGOUT_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.LOGOUT_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          logoutRequest: true
      })
      )
    })
  
    it('should handle LOGOUT_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.LOGOUT_SUCCESS,
          data: testData
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState
      })
      )
    })
  
    it('should handle LOGOUT_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.LOGOUT_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          logoutRequest: false,
          logoutFailed: true
      })
      )
    })
  
    it('should handle DROP_LOGOUT_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_LOGOUT_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          logoutRequest: false,
          logoutFailed: false
      })
      )
    })

  
    it('should handle GET_PROFILE_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.GET_PROFILE_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          getProfileRequest: true
      })
      )
    })
  
    it('should handle GET_PROFILE_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.GET_PROFILE_SUCCESS,
          data: testData
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          getProfileRequest: false,
          getProfileFailed: false,
          user: testUser
      })
      )
    })
  
    it('should handle GET_PROFILE_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.GET_PROFILE_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          getProfileRequest: false,
          getProfileFailed: true
      })
      )
    })
  
    it('should handle DROP_GET_PROFILE_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_GET_PROFILE_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          getProfileRequest: false,
          getProfileFailed: false
      })
      )
    })

  
    it('should handle UPDATE_PROFILE_REQUEST', () => {
      expect(
        reducer(initialState, {
          type: types.UPDATE_PROFILE_REQUEST
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          updateProfileRequest: true
      })
      )
    })
  
    it('should handle UPDATE_PROFILE_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.UPDATE_PROFILE_SUCCESS,
          data: testData
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          updateProfileRequest: false,
          updateProfileFailed: false,
          user: testUser
      })
      )
    })
  
    it('should handle UPDATE_PROFILE_FAILED', () => {
      expect(
        reducer(initialState, {
          type: types.UPDATE_PROFILE_FAILED
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          updateProfileRequest: false,
          updateProfileFailed: true
      })
      )
    })
  
    it('should handle DROP_UPDATE_PROFILE_ERROR', () => {
      expect(
        reducer(initialState, {
          type: types.DROP_UPDATE_PROFILE_ERROR
        })
      ).toEqual(      
        expect.objectContaining({
          ...initialState,
          updateProfileRequest: false,
          updateProfileFailed: false
      })
      )
    })
})
