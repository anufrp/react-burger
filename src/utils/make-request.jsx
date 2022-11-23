import { checkResponse } from "./check-response"

export default function request(url, options) {
    
    return fetch(url, options).then(checkResponse)
  }