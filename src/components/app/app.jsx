import React, { useEffect, useReducer} from "react";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';
import { activeTabContext } from "../../services/tabsContext";
import { activeTabInitialState } from "./app.consts";
import { activeTabReducer } from "./app.utils";


export default function App() {

    const body = document.querySelector("body");
    const [activeTabState, activeTabDispatcher] = useReducer(activeTabReducer, activeTabInitialState, undefined);

    useEffect(() => {
          body.classList += styles.bodyScroll;
      }, []);

    return (
        <>
            <AppHeader />
            <div>
                <div className={`${styles.main}`}>
                  <DndProvider backend={HTML5Backend}>
                    <activeTabContext.Provider value={{ activeTabState, activeTabDispatcher }}>
                      <BurgerIngredients />
                    </activeTabContext.Provider>
                    
                    <BurgerConstructor /> 
                  </DndProvider>
                </div>
            </div>
        </>
    )
}
