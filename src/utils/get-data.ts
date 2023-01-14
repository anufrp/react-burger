import { TResponseUser } from "../services/actions/user";
import { API_BASE } from "../services/constants";
import { getCookie, setCookie } from "./cookie";
import request from "./make-request";

export function getData<TResponse>(url: string, options?: RequestInit):Promise<TResponse> {
    try {
        const res = request<TResponse & {message?: string}>(url, options as RequestInit);
        const msg = res.then(res => {
            if(res.message === "jwt expired")
                updateToken(url, options);
        })
        //console.log('get data>', res.then(res => res));
        return res;
    } 
    catch (err: any) {
        if (err.message === "jwt expired") {
            updateToken(url, options);
        }
    }
    return Promise.reject("Ошибка!");
};

export function sendData<TResponse>(url: string, data: JSON):Promise<TResponse> {

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) as BodyInit
    }
    
    return request<TResponse>(url, options)
    
};

function updateToken(parentUrl: string, parentOptions: any):void {

    const options = {
        "token": getCookie('refreshToken')
    } 

    sendData<TResponseUser>(API_BASE + 'auth/token', options as unknown as JSON)
    .then(res => {
        if (res && res.success) {

            const accessToken = res.accessToken.split('Bearer ')[1];                
            setCookie("accessToken", accessToken);            
            setCookie("refreshToken", res.refreshToken);

            parentOptions.headers.authorization = res.accessToken;
            getData(parentUrl, parentOptions);
            
        } 
        else { 
            Promise.reject(`Ошибка ${res}`);
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        Promise.reject(`Ошибка ${error}`);
    });
};
