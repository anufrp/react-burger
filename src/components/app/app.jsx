import React, { useEffect, useReducer} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';
import { activeTabContext } from "../../services/tabsContext";
import { activeTabInitialState } from "./app.consts";
import { activeTabReducer } from "./app.utils";
import LoginPage from "../../pages/login/login";


export default function App() {

    const body = document.querySelector("body");
    const [activeTabState, activeTabDispatcher] = useReducer(activeTabReducer, activeTabInitialState, undefined);

    useEffect(() => {
          body.classList += styles.bodyScroll;
      }, []);

    return (
      <>
        <AppHeader />

        <Router>
          <Switch>
            <Route path="/" exact={true}>
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
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
          </Switch>
        </Router>

      </>
    )
}
