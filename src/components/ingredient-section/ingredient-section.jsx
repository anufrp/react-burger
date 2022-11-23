import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from './ingredient-section.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { BUN, SAUCE, MAIN } from "../../services/constants";
import { activeTabContext } from "../../services/tabsContext";
import { useDispatch } from 'react-redux';
import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { v4 as uuidv4 } from 'uuid';

export default function IngredientSection({type, items}) {     
    
    const { activeTabState, activeTabDispatcher } = useContext(activeTabContext);
    const headerNode = useRef(null);
    const dispatch = useDispatch();
    
    const [showModal, setShowModal] = React.useState(false);

    const selectIngredient = (id) => {

        const currentIngredient = findElement(id);
        //currentIngredient = {...currentIngredient, uid: uuidv4()}

        //Добавлять выбранный ингредиент в конструктор по клику
        // switch (currentIngredient.type){
        //     case 'bun': 
        //         dispatch({type: SET_BUN, item: currentIngredient});
        //         break;
        //     default:
        //         dispatch({type: TOPUP_CONSTRUCTOR_LIST, item: currentIngredient});
        //         break;
        // }

        dispatch({type: SET_INGREDIENT_DETAILS, item: currentIngredient});
        setShowModal(true);

    }

    const closeModal = () => {
        setShowModal(false);
        dispatch({type: CLEAR_INGREDIENT_DETAILS});
    }

    const findElement = (id) => {
        return items.find( item => item._id === id)
    }

    useEffect(() => {
        activeTabDispatcher(
            {
                type: 'set_' + type + '_node',
                ref: headerNode
            }
        );
    }, [headerNode]);

    return (
        <>
        <div className={'mb-6'} ref={headerNode}>
            <span className="text text_type_main-medium">
                {
                    type === BUN && (<>Булки</>)
                }
                {
                    type === SAUCE && (<>Соусы</>)
                }
                {
                    type === MAIN && (<>Начинки</>)
                }
            </span>
        </div>                
        <div className={styles.cards}>
            {items.map((item) => (
                item.type === type && (<IngredientCard key={item._id} item={item} onClickFunc={selectIngredient} />)
            ))}
        </div>
        
        {showModal && (
                <Modal title="Детали ингредиента" closeFunc={closeModal}>
                    <IngredientDetails />
                </Modal>
            )}
        </>
    );
}

IngredientSection.propTypes = {
    type: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
}
