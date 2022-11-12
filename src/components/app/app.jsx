import React, {useState, useEffect, useReducer} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {GetData} from "../../utils/get-data";
import styles from './app.module.css';
import { IngredientContext, OrderNumberContext } from "../../services/constructorContext";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'
const BUN = 'bun';
const orderNumberInitialState = { number: '' };
const constructorItemsInitialState = { items: [] };

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
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }    
  }

export default function App() {

    const [data , setData ] = useState();
    const body = document.querySelector("body");
    const [orderNumberState, orderNumberDispatcher] = useReducer(orderNumberReducer, orderNumberInitialState, undefined);
    const [constructorItemsState, constructorItemsDispatcher] = useReducer(constructorItemsReducer, constructorItemsInitialState, undefined);

    useEffect(() => {
        GetData(API_URL)
          .then((data) => {
                            setData(data);
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
                    (<>
                        <IngredientContext.Provider value={{ constructorItemsState, constructorItemsDispatcher }}>
                            <BurgerIngredients items={data} />
                            <OrderNumberContext.Provider value={{ orderNumberState, orderNumberDispatcher }}>
                                <BurgerConstructor />
                            </OrderNumberContext.Provider>          
                        </IngredientContext.Provider>                        
                    </>)}
                </div>
            </div>
        </>
    )
}