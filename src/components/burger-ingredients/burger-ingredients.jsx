import React, { useContext, useEffect, useReducer, useRef } from "react";
import PropTypes, { func } from "prop-types";
import styles from './burger-ingredients.module.css';
import Tabs from '../ingredients-tabs/ingredients-tabs'
import IngredientSection from '../ingredient-section/ingredient-section'
import Loader from "../loader/loader";
import ErrorMessage from "../error-message/error-message";
import Modal from "../modal/modal";
import { activeTabContext } from "../../services/tabsContext";
import { BUN, SAUCE, MAIN } from "../../services/constants";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions/actions";

export default function BurgerIngredients() {
    
    const { activeTabState, activeTabDispatcher } = useContext(activeTabContext);
    const dispatch = useDispatch();
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => 
        ({
            ingredients: store.burger.ingredients, 
            ingredientsRequest: store.burger.ingredientsRequest,
            ingredientsFailed: store.burger.ingredientsFailed
        }));
    const ingredientsNode = useRef(null);

    function updateActiveTab(tab) {
        activeTabDispatcher({type: 'setActive', activeTab: tab});
    }
    
    const getNearestHeader = (e) => {
        e.stopPropagation();

        const bunDist = Math.abs(activeTabState.tabsNode.getBoundingClientRect().bottom - activeTabState.bunNode.getBoundingClientRect().top);
        const sauceDist = Math.abs(activeTabState.tabsNode.getBoundingClientRect().bottom - activeTabState.sauceNode.getBoundingClientRect().top);
        const mainDist = Math.abs(activeTabState.tabsNode.getBoundingClientRect().bottom - activeTabState.mainNode.getBoundingClientRect().top);

        const activeNode = (bunDist < sauceDist & bunDist < mainDist) ? BUN 
                                : (sauceDist < bunDist & sauceDist < mainDist) ? SAUCE 
                                    : MAIN;

        if(activeNode !== activeTabState.activeTab)
            updateActiveTab(activeNode);        
    }

    useEffect(() => {
        dispatch(getIngredients());
      },[dispatch])

    return (
        <div className={`${styles.main} mr-10`}>
            <div className={'mt-10 mb-5'}>
                <span className="text text_type_main-large">
                    Соберите бургер
                </span>
            </div>      

            {
                ingredientsRequest && <div className={styles.ingredients}><Loader /></div>
            }     

            {
                ingredientsFailed && <div className={styles.ingredients}><Modal><ErrorMessage>Попробуйте перезагрузить страницу</ErrorMessage></Modal></div>
            }     

            { !ingredientsRequest && ingredients.length > 0 &&
            (<>
                <Tabs />
                <div className={styles.ingredients} ref={ingredientsNode} onScroll={getNearestHeader}>
                    <IngredientSection items={ingredients} type={BUN} />
                    <IngredientSection items={ingredients} type={SAUCE} />
                    <IngredientSection items={ingredients} type={MAIN} />                
                </div>
            </>)
            }        
        </div>
    )
}
