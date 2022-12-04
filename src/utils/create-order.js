import { getCookie } from "./cookie";
import request from "./make-request";

export function createOrder(url, ingredients) {
    let options = {
                method: 'POST',
                Authorization: 'Bearer ' + getCookie('accessToken'),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ingredients: ingredients})
                }

    return request(url, options)
}
