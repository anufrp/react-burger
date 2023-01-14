import { TResponseUser } from "../services/actions/user";
import { API_BASE } from "../services/constants";
import { getCookie, setCookie } from "./cookie";
import { sendData, getData } from "./get-data";
import request from "./make-request";


export function createOrder<TResponse>(url: string, ingredients: Array<string>):Promise<TResponse> {
    const options = {
                method: 'POST',
                Authorization: 'Bearer ' + getCookie('accessToken'),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ingredients: ingredients})
                }
    try {
        return request<TResponse>(url, options)
    }
    catch (err: any) {
        if (err.message === "jwt expired") {
            updateToken(url, ingredients);
        }
    }
    return Promise.reject("Ошибка!");
}


function updateToken(parentUrl: string, ingredients: Array<string>):void {

    const options = {
        "token": getCookie('refreshToken')
    } 

    sendData<TResponseUser>(API_BASE + 'auth/token', options as unknown as JSON)
    .then(res => {
        if (res && res.success) {

            const accessToken = res.accessToken.split('Bearer ')[1];                
            setCookie("accessToken", accessToken);            
            setCookie("refreshToken", res.refreshToken);

            createOrder(parentUrl, ingredients);
            
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
