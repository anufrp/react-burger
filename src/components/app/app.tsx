import React, { FC, useEffect, useReducer} from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
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
// import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";
import * as H from "history"
import { useDispatch } from "../../hooks";


const App: FC = () => {

    const [activeTabState, activeTabDispatcher] = useReducer(activeTabReducer, activeTabInitialState, undefined);
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();

    const location = useLocation<{background: H.Location}>();
    const history = useHistory();
    const background = location.state && location.state.background;
  
    const handleModalClose = () => {
      // Возвращаемся к предыдущему пути при закрытии модалки
      history.goBack();
    };

    useEffect(() => {
        dispatch(getIngredients());
        if(accessToken !== undefined) {
          dispatch(getProfile());
        }     
      }, []);

    return (
      <>
        <AppHeader />

          <Switch location={background || location}>
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
            <ProtectedRoute onlyForAuth={false} path="/login" exact={true}>
              <LoginPage />
            </ProtectedRoute>
            <ProtectedRoute onlyForAuth={false} path="/register" exact={true}>
              <RegisterPage />
            </ProtectedRoute>
            <ProtectedRoute onlyForAuth={false} path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
            <ProtectedRoute onlyForAuth={false} path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
            <ProtectedRoute onlyForAuth={true} path="/profile" >
              <ProfilePage />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact={true}>
              <Ingredients />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>

          {background && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal title="Детали ингредиента" closeFunc={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}

      </>
    )
}

export default App;
