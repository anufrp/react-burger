import React from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    
    const { ingredientDetails } = useSelector(store => 
        ({
            ingredientDetails: store.ingredientDetails.ingredientDetails
        }));

    return (
    <> { ingredientDetails !== undefined &&
        <div className={styles.main}>
            <div>
                <img alt={ingredientDetails.name} src={ingredientDetails.image_large}/>
            </div>
            <div className={`mt-4 mb-8`}>
                <span className="text text_type_main-medium">
                    {ingredientDetails.name}
                </span>
            </div>
            <div className={`${styles.details} mb-15`}>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.calories}
                    </span>
                </div>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.carbohydrates}
                    </span>
                </div>

                <div className={styles.details_part} >
                    <span className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.fat}
                    </span>
                </div>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.proteins}
                    </span>
                </div>

            </div>
        </div>
    }</>
    )
}
