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
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import NotFound from "../../pages/not-found/not-found";
import Ingredients from "../../pages/ingredients/ingredients";
import { ProtectedRoute } from "../protected-route";
import { getCookie } from "../../utils/cookie";
import { getProfile } from "../../services/actions/user";
import { useDispatch } from "react-redux";


export default function App() {

    const body = document.querySelector("body");
    const [activeTabState, activeTabDispatcher] = useReducer(activeTabReducer, activeTabInitialState, undefined);
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();

    useEffect(() => {
        if(accessToken !== undefined) {
          dispatch(getProfile());
        }     
          body.classList += styles.bodyScroll;
      }, []);

    return (
      <>
        <AppHeader />

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
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path="/profile" >
              <ProfilePage />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact={true}>
              <Ingredients />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>

      </>
    )
}
