import { 
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    DROP_REGISTER_ERROR,

    CHEK_EMAIL_REQUEST,
    CHEK_EMAIL_SUCCESS,
    CHEK_EMAIL_FAILED,
    DROP_CHEK_EMAIL_ERROR,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    DROP_RESET_PASSWORD_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    DROP_LOGIN_ERROR
} from "../actions/user"

const initialState = {  
    user: {},
    registerUserRequest: false,
    registerUserFailed: false,

    forgotEmailCheck: false,
    forgotEmailCheckRequest: false,
    forgotEmailCheckFailed: false,

    passwordReseted: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,

    loginRequest: false,
    loginFailed: false
  };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
        return {...state, registerUserRequest: true};
    }
    case REGISTER_USER_SUCCESS: {
        return { ...state, registerUserFailed: false, user: action.data.user, registerUserRequest: false };
    }
    case REGISTER_USER_FAILED: {
        return { ...state, registerUserFailed: true, registerUserRequest: false };
    }
    case DROP_REGISTER_ERROR: {
        return { ...state, registerUserFailed: false, registerUserRequest: false };
    }
    
    case CHEK_EMAIL_REQUEST: {
        return {...state, forgotEmailCheckRequest: true};
    }
    case CHEK_EMAIL_SUCCESS: {
        return { ...state, forgotEmailCheckFailed: false, forgotEmailCheck: true, forgotEmailCheckRequest: false };
    }
    case CHEK_EMAIL_FAILED: {
        return { ...state, forgotEmailCheckFailed: true, forgotEmailCheckRequest: false };
    }
    case DROP_CHEK_EMAIL_ERROR: {
        return { ...state, forgotEmailCheckFailed: false, forgotEmailCheckRequest: false };
    }
    
    case RESET_PASSWORD_REQUEST: {
        return {...state, resetPasswordRequest: true};
    }
    case RESET_PASSWORD_SUCCESS: {
        return { ...state, resetPasswordFailed: false, passwordReseted: true, resetPasswordRequest: false };
    }
    case RESET_PASSWORD_FAILED: {
        return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
    }
    case DROP_RESET_PASSWORD_ERROR: {
        return { ...state, resetPasswordFailed: false, resetPasswordRequest: false };
    }
    
    case LOGIN_REQUEST: {
        return {...state, loginRequest: true};
    }
    case LOGIN_SUCCESS: {
        return { ...state, loginFailed: false, user: action.data.user, loginRequest: false };
    }
    case LOGIN_FAILED: {
        return { ...state, loginFailed: true, loginRequest: false };
    }
    case DROP_LOGIN_ERROR: {
        return { ...state, loginFailed: false, loginRequest: false };
    }

    default: {
      return state;
    }
  }
};

