import request from "./make-request";

export function createOrder(url, ingredients) {
    let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ingredients: ingredients})
                }

    return request(url, options)
}