import { checkResponse } from "./check-response"

const request = <T>(url: string, options: any): Promise<T> => {

  return fetch(url, options).then(checkResponse)

}

  export default request;

