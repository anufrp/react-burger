import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-section.module.css';
import IngredientCard from '../ingredient-card/ingredient-card'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'

export default function IngredientSection({type, items}) { 

    let [currentIngredient, setCurrentIngredient] = React.useState();
    let [showModal, setShowModal] = React.useState(false);

    const selectIngredient = (id) => {
        setCurrentIngredient(findElement(id));
        setShowModal(true);
        console.log(id);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const findElement = (id) => {
        return items.find( item => item._id === id)
    }

    return (
        <>
        <div className={'mb-6'}>
            <span className="text text_type_main-medium">
                {
                    type == "bun" && (<>Булки</>)
                }
                {
                    type == "sauce" && (<>Соусы</>)
                }
                {
                    type == "main" && (<>Начинки</>)
                }
            </span>
        </div>
        <div className={styles.cards}>
            {items.map((item) => (
                item.type == type && (<IngredientCard key={item._id} item={item} onClickFunc={selectIngredient} />)
            ))}
        </div>
        
        {showModal && (
                <Modal title="Детали ингредиента" closeFunc={closeModal}>
                    <IngredientDetails item={currentIngredient} />
                </Modal>
            )}
        </>
    );
}

IngredientSection.propTypes = {
    type: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
}
