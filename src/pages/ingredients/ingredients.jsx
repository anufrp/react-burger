import React, { useEffect} from 'react';
import styles from './ingredients.module.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import { SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import App from '../../components/app/app';

export default function Ingredients() {
    const history = useHistory(); 
    const location = useLocation();    
    const dispatch = useDispatch();
    const { id } = useParams();
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => 
        ({
            ingredients: store.ingredients.ingredients, 
            ingredientsRequest: store.ingredients.ingredientsRequest,
            ingredientsFailed: store.ingredients.ingredientsFailed
        }));


    const closeModal = () => {
        // dispatch({type: DROP_CHEK_EMAIL_ERROR});
        dispatch(getIngredients());
    }

    const findElement = (id) => {
        return ingredients.find( item => item._id === id)
    }

    useEffect(() => {
        if(ingredients.length === 0) dispatch(getIngredients());
        else {
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
                ingredientsFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте обновить страницу</ErrorMessage></Modal>)
            }
        </div>
    );
} 
