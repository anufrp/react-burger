import request from "./make-request";

export function getData(url, options) {
    
    return request(url, options)
    
    };

export function sendData(url, data) {

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }
    
    return request(url, options)
    
    };

