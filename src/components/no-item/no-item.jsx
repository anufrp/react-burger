import React from "react";
import styles from "./no-item.module.css";
import noTopBun from "../../images/no-top-bun.png"
import noBottomBun from "../../images/no-bottom-bun.png"
import noIngredients from "../../images/no-ingredients.png"

export default function NoItem({type}) {

    let className, text;

    switch(type) {
        case "topbun": 
        className = styles.noTopBun;
            text = "Не выбрана булка";
            break;
        case "ingredient": 
        className = styles.noIngredients;
            text = "Не выбран ингредиент";
            break;
        case "bottombun": 
        className = styles.noBottomBun;
            text = "Не выбрана булка";
            break;
        default: break;
    }

    return (
            <div className={`${styles.base} ${className} ml-5`} >            
                <span className="text text_type_main-default">
                    {text}
                </span>
            </div>
    )
}