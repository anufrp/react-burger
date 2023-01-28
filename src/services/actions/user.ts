import { getData, sendData } from "../../utils/get-data";
import { API_BASE } from "../constants";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk, TApplicationActions } from "../..";

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
export const DROP_REGISTER_ERROR: 'DROP_REGISTER_ERROR' = 'DROP_REGISTER_ERROR';

export const CHEK_EMAIL_REQUEST: 'CHEK_EMAIL_REQUEST' = 'CHEK_EMAIL_REQUEST';
export const CHEK_EMAIL_SUCCESS: 'CHEK_EMAIL_SUCCESS' = 'CHEK_EMAIL_SUCCESS';
export const CHEK_EMAIL_FAILED: 'CHEK_EMAIL_FAILED' = 'CHEK_EMAIL_FAILED';
export const DROP_CHEK_EMAIL_ERROR: 'DROP_CHEK_EMAIL_ERROR' = 'DROP_CHEK_EMAIL_ERROR';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const DROP_RESET_PASSWORD_ERROR: 'DROP_RESET_PASSWORD_ERROR' = 'DROP_RESET_PASSWORD_ERROR';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const DROP_LOGIN_ERROR: 'DROP_LOGIN_ERROR' = 'DROP_LOGIN_ERROR';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const DROP_LOGOUT_ERROR: 'DROP_LOGOUT_ERROR' = 'DROP_LOGOUT_ERROR';

export const GET_PROFILE_REQUEST: 'GET_PROFILE_REQUEST' = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS' = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILED: 'GET_PROFILE_FAILED' = 'GET_PROFILE_FAILED';
export const DROP_GET_PROFILE_ERROR: 'DROP_GET_PROFILE_ERROR' = 'DROP_GET_PROFILE_ERROR';

export const UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST' = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS' = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED: 'UPDATE_PROFILE_FAILED' = 'UPDATE_PROFILE_FAILED';
export const DROP_UPDATE_PROFILE_ERROR: 'UPDATE_GET_PROFILE_ERROR' = 'UPDATE_GET_PROFILE_ERROR';

export type TRegisterUserAction = {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export type TResponseUser = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string
    },
    message?: string
}

export type TRegisterUserSuccessAction = {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly data: TResponseUser;
}

export type TRegisterUserFailedAction = {
    readonly type: typeof REGISTER_USER_FAILED;
}

export type TRegisterUserDropErrorAction = {
    readonly type: typeof DROP_REGISTER_ERROR;
}

export type TChekEmailAction = {
    readonly type: typeof CHEK_EMAIL_REQUEST;
}

export type TChekEmailSuccessAction = {
    readonly type: typeof CHEK_EMAIL_SUCCESS;
}

export type TChekEmailFailedAction = {
    readonly type: typeof CHEK_EMAIL_FAILED;
}

export type TChekEmailDropErrorAction = {
    readonly type: typeof DROP_CHEK_EMAIL_ERROR;
}

export type TResetPasswordAction = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export type TResetPasswordFailedAction = {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordDropErrorAction = {
    readonly type: typeof DROP_RESET_PASSWORD_ERROR;
}

export type TLoginAction = {
    readonly type: typeof LOGIN_REQUEST;
}

export type TLoginSuccessAction = {
    readonly type: typeof LOGIN_SUCCESS;
    readonly data: TResponseUser
}

export type TLoginFailedAction = {
    readonly type: typeof LOGIN_FAILED;
}

export type TLoginDropErrorAction = {
    readonly type: typeof DROP_LOGIN_ERROR;
}

export type TLogoutAction = {
    readonly type: typeof LOGOUT_REQUEST;
}

export type TLogoutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS;
}

export type TLogoutFailedAction = {
    readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutDropErrorAction = {
    readonly type: typeof DROP_LOGOUT_ERROR;
}

export type TGetProfileAction = {
    readonly type: typeof GET_PROFILE_REQUEST;
}

export type TGetProfileSuccessAction = {
    readonly type: typeof GET_PROFILE_SUCCESS;
    readonly data: TResponseUser;
}

export type TGetProfileFailedAction = {
    readonly type: typeof GET_PROFILE_FAILED;
}

export type TGetProfileDropErrorAction = {
    readonly type: typeof DROP_GET_PROFILE_ERROR;
}

export type TUpdateProfileAction = {
    readonly type: typeof UPDATE_PROFILE_REQUEST;
}

export type TUpdateProfileSuccessAction = {
    readonly type: typeof UPDATE_PROFILE_SUCCESS;
    readonly data: TResponseUser;
}

export type TUpdateProfileFailedAction = {
    readonly type: typeof UPDATE_PROFILE_FAILED;
}

export type TUpdateProfileDropErrorAction = {
    readonly type: typeof DROP_UPDATE_PROFILE_ERROR;
}

export type TUserActions = 
    | TRegisterUserAction
    | TRegisterUserSuccessAction
    | TRegisterUserFailedAction
    | TRegisterUserDropErrorAction
    | TChekEmailAction
    | TChekEmailSuccessAction
    | TChekEmailFailedAction
    | TChekEmailDropErrorAction
    | TResetPasswordAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailedAction
    | TResetPasswordDropErrorAction
    | TLoginAction
    | TLoginSuccessAction
    | TLoginFailedAction
    | TLoginDropErrorAction
    | TLogoutAction
    | TLogoutSuccessAction
    | TLogoutFailedAction
    | TLogoutDropErrorAction
    | TGetProfileAction
    | TGetProfileSuccessAction
    | TGetProfileFailedAction
    | TGetProfileDropErrorAction
    | TUpdateProfileAction
    | TUpdateProfileSuccessAction
    | TUpdateProfileFailedAction
    | TUpdateProfileDropErrorAction;

// Генераторы экшенов
export const registerUserRequest = (data: TResponseUser): TRegisterUserSuccessAction => ({
    type: REGISTER_USER_SUCCESS,
    data
});

export const loginRequest = (data: TResponseUser): TLoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    data
});

export const getProfileRequest = (data: TResponseUser): TGetProfileSuccessAction => ({
    type: GET_PROFILE_SUCCESS,
    data
});

export const updateProfileRequest = (data: TResponseUser): TUpdateProfileSuccessAction => ({
    type: UPDATE_PROFILE_SUCCESS,
    data
});

export const registerUser: AppThunk = (newUserData: JSON) => (dispatch: AppDispatch) => { 

    dispatch({
        type: REGISTER_USER_REQUEST
    });

    sendData<TResponseUser>(API_BASE + 'auth/register', newUserData)
    .then(res => {
        if (res && res.success) {

            const accessToken = res.accessToken.split('Bearer ')[1];
            
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", res.refreshToken);
            console.log(res);
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
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: REGISTER_USER_FAILED});       
    });
};


export const forgotPassword: AppThunk = (request: JSON) => (dispatch) => { 

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
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: CHEK_EMAIL_FAILED});       
    });
};


export const resetPassword: AppThunk = (request: JSON) => (dispatch: AppDispatch) => { 

    dispatch({
        type: RESET_PASSWORD_REQUEST
    });

    sendData<{success: boolean}>(API_BASE + 'password-reset/reset', request)
    .then(res => {
        if (res && res.success) {

            dispatch({
                type: RESET_PASSWORD_SUCCESS//,
                //data: res
            });            
        } 
        else { 
            dispatch({type: RESET_PASSWORD_FAILED});
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: RESET_PASSWORD_FAILED});       
    });
};


export const loginUser:AppThunk = (request: JSON) => (dispatch: AppDispatch) => { 

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
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: LOGIN_FAILED});       
    });
};


export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => { 

    const request = {
        "token": getCookie('refreshToken')
    };

    dispatch({
        type: LOGOUT_REQUEST
    });

    sendData<{success: boolean}>(API_BASE + 'auth/logout', request as unknown as JSON)
    .then(res => {
        if (res && res.success) {
            
            deleteCookie("accessToken");
            deleteCookie("refreshToken");

            dispatch({
                type: LOGOUT_SUCCESS//,
                //data: res
            });            
        } 
        else { 
            dispatch({type: LOGOUT_FAILED});
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: LOGOUT_FAILED});       
    });
};


export const getProfile: AppThunk = () => (dispatch: AppDispatch) => { 

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

    getData<TResponseUser>(API_BASE + 'auth/user', options)
    .then(res => {
        if (res && res.success) {
            
            dispatch({
                type: GET_PROFILE_SUCCESS,
                data: res
            });
        } 
        else { console.log('res', res);
            if(res.message === "jwt expired"){
                //обновить токен
                //dispatch(updateToken(getProfile, GET_PROFILE_REQUEST, GET_PROFILE_FAILED));
            }
            else
                dispatch({type: GET_PROFILE_FAILED});
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: GET_PROFILE_FAILED});       
    })
};

export const updateProfile: AppThunk = (data: JSON) => (dispatch: AppDispatch) => { 

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

    getData<TResponseUser>(API_BASE + 'auth/user', options)
    .then(res => {
        if (res && res.success) {
            
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                data: res
            });
        } 
        else { console.log('res', res);
            if(res.message === "jwt expired"){
                //обновить токен
                //dispatch(updateToken(() => updateProfile(data), UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAILED));
            }
            else
                dispatch({type: UPDATE_PROFILE_FAILED});
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        dispatch({type: UPDATE_PROFILE_FAILED});       
    });
};
