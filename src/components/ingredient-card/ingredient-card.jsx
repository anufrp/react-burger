import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';

export default function IngredientCard({item, onClickFunc}) { 

    let[count, setCount] = useState(0);

    useEffect(() => {
        setCount(parseInt(Math.random() * 3))
    }) 

    return (
    <div className={`${styles.card} mb-8`} onClick={()=>onClickFunc(item._id)}>

        {count != 0 && (<Counter count={count} size="default" />)}

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
