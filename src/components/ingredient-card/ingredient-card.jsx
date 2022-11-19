import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import { useSelector } from 'react-redux';

export default function IngredientCard({item, onClickFunc}) { 

    const[count, setCount] = useState();

    const {constructorItems, bun} = useSelector(store => 
        ({
            constructorItems: store.burger.constructorItems,
            bun: store.burger.bun
        }));
    
    useEffect(() => {
        switch (item.type) {
            case 'bun': 
                setCount(bun._id === item._id ? 2 : 0);
                break;
            default:
                setCount(constructorItems.filter((constrItem) => constrItem._id === item._id).length);
                break;
        }
    },[constructorItems, bun]) 

    return (
    <div className={`${styles.card} mb-8`} onClick={()=>onClickFunc(item._id)}>

        {count!==0 && (<Counter count={count} size="default" />)}

        <img className={'ml-4 mr-4'} alt={item.name} src={item.image}/>

        <div className={styles.price}>
            <span className="text text_type_digits-default">
                {item.price}
            </span>
            <CurrencyIcon type="primary" />
        </div>

        <span className="text text_type_main-default">
            {item.name}
        </span>
    </div>
    );
}

IngredientCard.propTypes = {
    item: PropTypes.object.isRequired,
    onClickFunc: PropTypes.func.isRequired
}
