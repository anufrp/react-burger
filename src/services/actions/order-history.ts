import { createAction } from "@reduxjs/toolkit"
import { TFeed } from "../../utils/types";

export const connect = createAction<string, "HISTORY_CONNECT">(
    "HISTORY_CONNECT"
);
export const disconnect = createAction(
    "HISTORY_DISCONNECT"
);
export const wsConnecting = createAction(
    "HISTORY_WS_CONNECTING"
);
export const wsOpen = createAction(
    "HISTORY_WS_OPEN"
);
export const wsClose = createAction(
    "HISTORY_WS_CLOSE"
);
export const wsMessage = createAction<TFeed, "HISTORY_WS_MESSAGE">(
    "HISTORY_WS_MESSAGE"
);
export const wsError = createAction<string, "HISTORY_WS_ERROR">(
    "HISTORY_WS_ERROR"
);

export type TFeedActions =  
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;
