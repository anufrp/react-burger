import { TFeed } from "./types";

export const feedUpdate = (
    //prevOrders: Feed,
    action: TFeed
): TFeed => {
    // let feed = prevOrders;
    // console.log('actns', action);
    let feed = action;
    // actions.forEach((action) => {
    //     switch (action.type) {
    //         case FeedActionType.DATA:
    //             feed = action.data;
    //             break;
    //         case FeedActionType.UPDATE:
    //             feed = action.data;
    //             break;
    //     }
    // })
    return feed;
};
