import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../..";

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisonnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>
}

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisonnect } = wsActions;
        
        if (wsConnect.match(action)) {
          socket = new WebSocket(action.payload);
          dispatch(wsConnecting());
        }
        if (socket) {
          socket.onopen = event => {
            dispatch(onOpen());
          };
  
          socket.onerror = event => {
            dispatch(onError('Error'));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = event => {
            dispatch(onClose());
          };
  
          if (wsSendMessage?.match(action)) {
            socket.send(JSON.stringify(action.payload));
          }
  
          if (wsDisonnect.match(action)) {
            socket.close();
            socket = null;
          }
        }
  
        next(action);
      };
    };
  };
