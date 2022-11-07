import React, {useState, useEffect} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {GetData} from "../../utils/get-data";
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'


export default function App() {

    const [data , setData ] = useState();
    const body = document.querySelector("body");

    useEffect(() => {
        GetData(API_URL)
          .then((data) => setData(data))
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
                        <BurgerIngredients items={data} />
                        <BurgerConstructor items={data} />
                    </>)}
                </div>
            </div>
        </>
    )
}