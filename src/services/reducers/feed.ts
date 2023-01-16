import { createReducer } from "@reduxjs/toolkit";
import { feedUpdate } from "../../utils/feed-update";
import { TFeed, WebsocketStatus } from "../../utils/types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/feed";

export type TFeedStore = {
  status: WebsocketStatus,
  feed: TFeed | null,
  connectionError: string
}

const initialState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  feed: null,
  connectionError: ''
};

export const feedReducer = createReducer(initialState, builder => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      if(action.payload.success) {
        state.feed = feedUpdate(action.payload);
      };
    });
});
