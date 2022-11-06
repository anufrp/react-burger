import React, {useState, useEffect} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'


export default function App() {

    let [data , setData ] = useState();

    useEffect( () => {
        fetch(API_URL)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } 
                })
                .then(data => {
                    setData(data.data);
                })
                .catch(error => {console.log('Ошибка при получении данных: ' + error.message)})
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