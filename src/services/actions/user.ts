import { getData, sendData } from "../../utils/get-data";
import { API_BASE } from "../constants";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

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

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const DROP_LOGOUT_ERROR = 'DROP_LOGOUT_ERROR';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED';
export const DROP_GET_PROFILE_ERROR = 'DROP_GET_PROFILE_ERROR';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';
export const DROP_UPDATE_PROFILE_ERROR = 'UPDATE_GET_PROFILE_ERROR';

type TResponseUser = {
    success: boolean,
    accessToken: string,
    refreshToken: string
}

export function registerUser(newUserData: JSON) {
    return function(dispatch: any) { 

        dispatch({
            type: REGISTER_USER_REQUEST
        });

        sendData<TResponseUser>(API_BASE + 'auth/register', newUserData)
        .then(res => {
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
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: REGISTER_USER_FAILED});       
        });;
    };
}

export function forgotPassword(request: JSON) {
    return function(dispatch: any) { 

        dispatch({
            type: CHEK_EMAIL_REQUEST
        });

        sendData<{success: boolean}>(API_BASE + 'password-reset', request)
        .then(res => {
            if (res && res.success) {

                dispatch({
                    type: CHEK_EMAIL_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: CHEK_EMAIL_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: CHEK_EMAIL_FAILED});       
        });;
    };
}

export function resetPassword(request: JSON) {
    return function(dispatch: any) { 

        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        sendData<{success: boolean}>(API_BASE + 'password-reset/reset', request)
        .then(res => {
            if (res && res.success) {

                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: RESET_PASSWORD_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: RESET_PASSWORD_FAILED});       
        });;
    };
}

export function loginUser(request: JSON) {
    return function(dispatch: any) { 

        dispatch({
            type: LOGIN_REQUEST
        });

        sendData<TResponseUser>(API_BASE + 'auth/login', request)
        .then(res => {
            if (res && res.success) {

                const accessToken = res.accessToken.split('Bearer ')[1];
                
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", res.refreshToken);

                dispatch({
                    type: LOGIN_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: LOGIN_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: LOGIN_FAILED});       
        });;
    };
}

export function logoutUser() {
    const request = {
        "token": getCookie('refreshToken')
    };
    return function(dispatch: any) { 

        dispatch({
            type: LOGOUT_REQUEST
        });

        sendData<{success: boolean}>(API_BASE + 'auth/logout', request as unknown as JSON)
        .then(res => {
            if (res && res.success) {
                
                deleteCookie("accessToken");
                deleteCookie("refreshToken");

                dispatch({
                    type: LOGOUT_SUCCESS,
                    data: res
                });            
            } 
            else { 
                dispatch({type: LOGOUT_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: LOGOUT_FAILED});       
        });;
    };
}

export function getProfile() {
    return function(dispatch: any) { 

        dispatch({
            type: GET_PROFILE_REQUEST
        });

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        }

        getData<{success: boolean, message: string}>(API_BASE + 'auth/user', options)
        .then(res => {
            if (res && res.success) {
                
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    data: res
                });
            } 
            else { console.log('res', res);
                if(res.message === "jwt expired"){
                    //???????????????? ??????????
                    dispatch(updateToken(getProfile, GET_PROFILE_REQUEST, GET_PROFILE_FAILED));
                }
                else
                    dispatch({type: GET_PROFILE_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: GET_PROFILE_FAILED});       
        })
    };
}

export function updateProfile(data: JSON) {
    return function(dispatch: any) { 

        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });

        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        }

        getData<{success: boolean, message: string}>(API_BASE + 'auth/user', options)
        .then(res => {
            if (res && res.success) {
                
                dispatch({
                    type: UPDATE_PROFILE_SUCCESS,
                    data: res
                });
            } 
            else { console.log('res', res);
                if(res.message === "jwt expired"){
                    //???????????????? ??????????
                    dispatch(updateToken(() => updateProfile(data), UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAILED));
                }
                else
                    dispatch({type: UPDATE_PROFILE_FAILED});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: UPDATE_PROFILE_FAILED});       
        });;
    };
}

type TCallBack = () => void;

export function updateToken(callback: TCallBack, REQUEST_ACTION: string, FAILED_ACTION: string) {
    return function(dispatch: any) { 

        dispatch({
            type: REQUEST_ACTION
        });

        const options = {
            "token": getCookie('refreshToken')
        } 

        sendData<TResponseUser>(API_BASE + 'auth/token', options as unknown as JSON)
        .then(res => {
            if (res && res.success) {

                const accessToken = res.accessToken.split('Bearer ')[1];                
                setCookie("accessToken", accessToken);            
                setCookie("refreshToken", res.refreshToken);
                
                dispatch(callback());
            } 
            else { 
                dispatch({type: FAILED_ACTION});
            }
        })
        .catch((error) => {
            console.error("???????????? ?????? ???????????????????? ??????????????!", error); 
            dispatch({type: FAILED_ACTION});       
        });;
    };
}

