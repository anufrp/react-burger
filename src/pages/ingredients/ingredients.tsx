import React, { FC, useEffect} from 'react';
import styles from './ingredients.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { TIngredient } from '../../utils/types';

type TUseParams = {
    id: string;
}

const Ingredients: FC = () => { 
    const dispatch = useDispatch();
    const { id } = useParams<TUseParams>();
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector((store: any) => 
        ({
            ingredients: store.ingredients.ingredients, 
            ingredientsRequest: store.ingredients.ingredientsRequest,
            ingredientsFailed: store.ingredients.ingredientsFailed
        }));

    const findElement = (id: string) => {
        return ingredients.find( (item: TIngredient) => item._id === id)
    }

    useEffect(() => {
        if(ingredients.length > 0) {
            const currentIngredient = findElement(id);
            dispatch({type: SET_INGREDIENT_DETAILS, item: currentIngredient});
        }

    },[dispatch, ingredients])
        
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <IngredientDetails />
            </div>
            {
                ingredientsRequest && (<Loader />)
            }

            { 
                ingredientsFailed && (<Modal closeFunc={() => {}}><ErrorMessage>Попробуйте обновить страницу</ErrorMessage></Modal>)
            }
        </div>
    );
} 

export default Ingredients;
