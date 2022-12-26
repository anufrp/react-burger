import { getCookie } from "./cookie";
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

    return request<TResponse>(url, options)
}
