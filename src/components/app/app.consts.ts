import { BUN } from "../../services/constants";

export type TActiveTabReducerState = { 
  activeTab: string,
  tabsNode: HTMLDivElement | null,
  bunNode: HTMLDivElement | null,
  sauceNode: HTMLDivElement | null,
  mainNode: HTMLDivElement | null
};

export const activeTabInitialState: TActiveTabReducerState = { 
    activeTab: BUN,
    tabsNode: null,
    bunNode: null,
    sauceNode: null,
    mainNode: null 
  };
