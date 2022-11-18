import React, {useState, useEffect, useReducer} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getData} from "../../utils/get-data";
import styles from './app.module.css';
import { IngredientContext, OrderNumberContext } from "../../services/constructorContext";
import { activeTabContext } from "../../services/tabsContext";
import { API_BASE, BUN, SAUCE } from "../../services/constants";

const API_URL = API_BASE + 'ingredients'

const orderNumberInitialState = { number: '' };
const constructorItemsInitialState = { items: [] };
const activeTabInitialState = { 
  activeTab: BUN,
  tabsNode: null,
  bunNode: null,
  sauceNode: null,
  mainNode: null 
};

function activeTabReducer(state, action) {
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

function orderNumberReducer(state, action) {
    switch (action.type) {
      case "set":
        return { number: action.number };
      case "reset":
        return orderNumberInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  function removeIngredient(ingredients, item){
    const indexOfItem = ingredients.findIndex(object => {
        return object._id === item._id;
      });         
      ingredients.splice(indexOfItem, 1);
      return ingredients;
}

function removeBun(ingredients){
    const indexOfItem = ingredients.findIndex(object => {
        return object.type === BUN;
      });            
      //console.log(indexOfItem);   
      if(indexOfItem !== -1) ingredients.splice(indexOfItem, 1);
      return ingredients;
}
  
function constructorItemsReducer(constructorItemsState, action) {
    //console.log(action.item);
    let tempIngredients = [...constructorItemsState.items];
    switch (action.type) {
        case "init":
          return { items: action.items };
        case "add":
            if(action.item.type === BUN) tempIngredients = removeBun(tempIngredients); //если добавляем булку, то удалить предыдущую
            return { items: [...tempIngredients, action.item] };
            case "remove":
                return { items: [...constructorItemsState.items, action.item] };
            case "reset":
                return constructorItemsInitialState;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }    
  }

export default function App() {

    const [data , setData ] = useState();
    const body = document.querySelector("body");
    const [constructorItemsState, constructorItemsDispatcher] = useReducer(constructorItemsReducer, constructorItemsInitialState, undefined);
    const [activeTabState, activeTabDispatcher] = useReducer(activeTabReducer, activeTabInitialState, undefined);

    useEffect(() => {
        getData(API_URL)
          .then((data) => {
                            setData(data.data);
                            //constructorItemsDispatcher({type: 'init', items: data});
          })
          .catch(error => {console.log('Ошибка при получении данных: ' + error.message)});

          body.classList += styles.bodyScroll;
      }, []);

    return (
        <>
            <AppHeader />
            <div>
                <div className={`${styles.main}`}>
                    {data &&
                    (<IngredientContext.Provider value={{ constructorItemsState, constructorItemsDispatcher }}>

                        <activeTabContext.Provider value={{ activeTabState, activeTabDispatcher }}>
                          <BurgerIngredients items={data} />
                        </activeTabContext.Provider>
                        
                        <BurgerConstructor />       

                    </IngredientContext.Provider>                        
                    )}
                </div>
            </div>
        </>
    )
}
