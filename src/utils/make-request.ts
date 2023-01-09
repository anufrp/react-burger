import { checkResponse } from "./check-response"

const request = <TResponse>(url: string, options: RequestInit): Promise<TResponse> => {

  return fetch(url, options).then(checkResponse)

}

export default request;
