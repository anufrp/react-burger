import request from "./make-request";

export function getData<TResponse>(url: string, options?: RequestInit):Promise<TResponse> {
    
    return request<TResponse>(url, options as RequestInit)
    
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

