import React from "react";
import PropTypes from "prop-types";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientSection from '../ingredient-section/ingredient-section'


function Tabs() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={`${styles.categories} mb-10`}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}


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
