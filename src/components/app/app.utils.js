import { BUN, SAUCE } from "../../services/constants";

export function activeTabReducer(state, action) {
    switch (action.type) {
        case "setActive":
          if (state.activeTab !== action.activeTab)
            return { ...state, activeTab: action.activeTab };
          else 
            return {...state};
        case "set_tabs_node":
            return { ...state, tabsNode: action.ref.current };
        case "set_bun_node":
            return { ...state, bunNode: action.ref.current };
        case "set_sauce_node":
            return { ...state, sauceNode: action.ref.current };
        case "set_main_node":
            return { ...state, mainNode: action.ref.current };
        case "scroll_to":
            action.tab === BUN ? state.bunNode.scrollIntoView({behavior: "smooth"})
            : action.tab === SAUCE ? state.sauceNode.scrollIntoView({behavior: "smooth"})
              : state.mainNode.scrollIntoView({behavior: "smooth"});
            return {...state};
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
