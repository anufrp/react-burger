import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from './burger-ingredients.module.css';
import Tabs from '../ingredients-tabs/ingredients-tabs'
import IngredientSection from '../ingredient-section/ingredient-section'
import { IngredientContext } from "../../services/constructorContext";

export default function BurgerIngredients({items}) {
    
    const { constructorItemsState, constructorItemsDispatcher } = useContext(IngredientContext);

    return (
        <div className={`${styles.main} mr-10`}>
            <div className={'mt-10 mb-5'}>
                <span className="text text_type_main-large">
                    Соберите бургер
                </span>
            </div>
            
            <Tabs />

            <IngredientContext.Provider value={{ constructorItemsState, constructorItemsDispatcher }}>
                <div className={styles.ingredients}>
                    <IngredientSection items={items} type="bun" />
                    <IngredientSection items={items} type="sauce" />
                    <IngredientSection items={items} type="main" />                
                </div>        
            </IngredientContext.Provider>  
        </div>
    )
}

BurgerIngredients.propTypes = {
    items: PropTypes.array.isRequired
};
