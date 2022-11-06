import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails({item}) {
    return (
        <div className={styles.main}>
            <div>
                <img alt={item.name} src={item.image_large}/>
            </div>
            <div className={`mt-4 mb-8`}>
                <span className="text text_type_main-medium">
                    {item.name}
                </span>
            </div>
            <div className={`${styles.details} mb-15`}>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {item.calories}
                    </span>
                </div>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {item.carbohydrates}
                    </span>
                </div>

                <div className={styles.details_part} >
                    <span className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {item.fat}
                    </span>
                </div>

                <div className={styles.details_part}>
                    <span className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {item.proteins}
                    </span>
                </div>

            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.object.isRequired
}