import React from "react";
import styles from "./no-item.module.css";

export default function NoItem({type}) {

    let className, text;

    switch(type) {
        case "topbun": 
        className = styles.noTopBun;
            text = "Перетащите булку";
            break;
        case "ingredient": 
        className = styles.noIngredients;
            text = "Перетащите ингредиенты";
            break;
        case "bottombun": 
        className = styles.noBottomBun;
            text = "Перетащите булку";
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
