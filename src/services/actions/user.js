//import { getData } from "../../utils/get-data";
import { sendData } from "../../utils/get-data";
import { API_BASE } from "../constants";
import { setCookie } from "../../utils/cookie";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const DROP_REGISTER_ERROR = 'DROP_REGISTER_ERROR';

export const CHEK_EMAIL_REQUEST = 'CHEK_EMAIL_REQUEST';
export const CHEK_EMAIL_SUCCESS = 'CHEK_EMAIL_SUCCESS';
export const CHEK_EMAIL_FAILED = 'CHEK_EMAIL_FAILED';
export const DROP_CHEK_EMAIL_ERROR = 'DROP_CHEK_EMAIL_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const DROP_RESET_PASSWORD_ERROR = 'DROP_RESET_PASSWORD_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const DROP_LOGIN_ERROR = 'DROP_LOGIN_ERROR';

export function registerUser(newUserData) {
    return function(dispatch) { 

        dispatch({
            type: REGISTER_USER_REQUEST
        });

        sendData(API_BASE + 'auth/register', newUserData).then(res => {
            if (res && res.success) {

                const accessToken = res.accessToken.split('Bearer ')[1];
                
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", res.refreshToken);

                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: REGISTER_USER_FAILED});
            }
        });
    };
}


export function forgotPassword(request) {
    return function(dispatch) { 

        dispatch({
            type: CHEK_EMAIL_REQUEST
        });

        sendData(API_BASE + 'password-reset', request).then(res => {
            if (res && res.success) {

                dispatch({
                    type: CHEK_EMAIL_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: CHEK_EMAIL_FAILED});
            }
        });
    };
}

export function resetPassword(request) {
    return function(dispatch) { 

        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        sendData(API_BASE + 'password-reset/reset', request).then(res => {
            if (res && res.success) {

                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: RESET_PASSWORD_FAILED});
            }
        });
    };
}

export function loginUser(request) {
    return function(dispatch) { 

        dispatch({
            type: LOGIN_REQUEST
        });

        sendData(API_BASE + 'auth/login', request).then(res => {
            if (res && res.success) {

                dispatch({
                    type: LOGIN_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: LOGIN_FAILED});
            }
        });
    };
}
