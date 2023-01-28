import React, { FC, useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "../../hooks";
import { useParams } from 'react-router-dom';
import { SET_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { TIngredient } from "../../utils/types";

type TParams = {
    id: string;
  };

const IngredientDetails: FC = () => {

    const dispatch = useDispatch();    
    const { id } = useParams<TParams>();
    
    const { ingredients, ingredientDetails } = useSelector((store: any) => 
        ({
            ingredients: store.ingredients.ingredients, 
            ingredientDetails: store.ingredientDetails.ingredientDetails
        }));
        
    const findElement = (id: string): TIngredient => {
        return ingredients.find( (item: TIngredient) => item._id === id)
    }

    useEffect(() => { 
        if(ingredients.length > 0) { //получить элемент, если ингредиенты уже получены
            const currentIngredient = findElement(id);
            dispatch({type: SET_INGREDIENT_DETAILS, item: currentIngredient});
        }
    }, [ingredients])
    
    return (
    <> { ingredientDetails &&
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

export default IngredientDetails;
