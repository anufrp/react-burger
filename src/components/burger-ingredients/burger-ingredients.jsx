import React from "react";
import PropTypes from "prop-types";
import styles from './burger-ingredients.module.css';
import Tabs from '../ingredients-tabs/ingredients-tabs'
import IngredientSection from '../ingredient-section/ingredient-section'

export default function BurgerIngredients({items}) {

    return (
        <div className={`${styles.main} mr-10`}>
            <div className={'mt-10 mb-5'}>
                <span className="text text_type_main-large">
                    Соберите бургер
                </span>
            </div>
            
            <Tabs />

            <div className={styles.ingredients}>
                <IngredientSection items={items} type="bun" />
                <IngredientSection items={items} type="sauce" />
                <IngredientSection items={items} type="main" />                
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    items: PropTypes.array.isRequired
};
