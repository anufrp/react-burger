import { FC } from "react";
import styles from "./icons.module.css";
import { useSelector } from "../../../hooks";
import { TIngredient } from "../../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const  Icons: FC<{ingredients: Array<string>}> = ({ingredients}) => {

    const ingredientsState = useSelector(store => store.ingredients.ingredients);
    let totalPrice = 0;

    return (
        <div className={styles.main}>
            <div className={styles.icons}>
                {ingredients.map((item : string, index : number) => {
                    const zIndex = 5 - index;
                    const ingredient = (ingredientsState != null) && ingredientsState.find((orderElem:TIngredient) => orderElem._id === item);
                    if (ingredient) {
                        totalPrice += ingredient.price;
                        const image = ingredient.image_mobile;
                        if (zIndex === 0) {
                            return (
                                <div className={styles.image_first} key={index}>
                                    <div className={styles.ingredient}>
                                        <img src={image} alt={ingredient.name}/>
                                    </div>
                                    <span className={`${styles.count} text text_type_main-default`}>{ingredients.length - 6 > 0 && `+${ingredients.length - 6}`}</span>
                                </div>
                            );
                        }
                        if (zIndex > 0) {
                            return (
                                <div className={styles.image} style={{ zIndex }} key={index}>
                                    <img src={image} alt={ingredient.name}/>
                                </div>
                            );
                        }
                        else {
                            return null;
                        }
                    }
                })}
            </div>
            <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">{totalPrice}</span>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
}

export default Icons;
