export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    uid?: string,
    index?: number
}

export enum WebsocketStatus {
    CONNECTING  = "CONNECTING...",
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export type TOrder = {
    "_id": string,
    "ingredients": Array<string>,
    "status": string,
    "name": string,
    "createdAt": string,
    "updatedAt": string,
    "number": number
}

export type TFeed = {
    "success": boolean,
    "orders": Array<TOrder>,
    "total": number,
    "totalToday": number
};

export type TOrdersStatus = {
    created: Array<number>,
    pending: Array<number>,
    done: Array<number>
} 
