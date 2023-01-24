import { TResponseUser } from "../services/actions/user";
import { API_BASE } from "../services/constants";
import { getCookie, setCookie } from "./cookie";
import request from "./make-request";

export function getData<TResponse>(url: string, options?: RequestInit):Promise<TResponse> {
    try {
        let res = request<TResponse & {message?: string}>(url, options as RequestInit);

        res.then(res => {
            if(res.message === "jwt expired") {              
                return updateToken(url, options);
            }
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

function updateToken<TResponse>(parentUrl: string, parentOptions: any):Promise<TResponse> {

    const options = {
        "token": getCookie('refreshToken')
    } 

    sendData<TResponseUser>(API_BASE + 'auth/token', options as unknown as JSON)
    .then(value => {
        if (value && value.success) {

            const accessToken = value.accessToken.split('Bearer ')[1];                
            setCookie("accessToken", accessToken);            
            setCookie("refreshToken", value.refreshToken);

            parentOptions.headers.authorization = value.accessToken;
            //getData(parentUrl, parentOptions);
                        
            return request<TResponse & {message?: string}>(parentUrl, parentOptions as RequestInit);

            
        } 
        else { 
            Promise.reject(`Ошибка ${value}`);
            return ;
        }
    })
    .catch((error) => {
        console.error("Ошибка при выполнении запроса!", error); 
        Promise.reject(`Ошибка ${error}`);
        
    });

    return Promise.reject(`Ошибка`);
};
