import React, { useEffect, useState } from "react";
import { useDrag } from 'react-dnd'
import PropTypes from "prop-types";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { SET_BUN, TOPUP_CONSTRUCTOR_LIST } from "../../services/actions/actions";
import { v4 as uuidv4 } from 'uuid';

export default function IngredientCard({item, onClickFunc}) { 

    const[count, setCount] = useState();

    const dispatch = useDispatch();

    const {constructorItems, bun} = useSelector(store => 
        ({
            constructorItems: store.burger.constructorItems,
            bun: store.burger.bun
        }));

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ingredient',
        item: item,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
            //console.log('You dropped ', item.name, ' into ', dropResult.name);
            
            switch (item.type){
                case 'bun': 
                    dispatch({type: SET_BUN, item: {...item, uid: uuidv4()}});
                    break;
                default:
                    dispatch({type: TOPUP_CONSTRUCTOR_LIST, item: {...item, uid: uuidv4()}});

                    //прокрутить контейнер с выбранными ингредиентами вниз
                    // const selectedIngredients = document.querySelector("#selectedIngredients");
                    // if(selectedIngredients !== null) 
                    //     selectedIngredients.scrollTo({ top: 99999, behavior: 'smooth' });

                    break;
            }


            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
        }))
        const opacity = isDragging ? 0.4 : 1
    
    useEffect(() => {
        switch (item.type) {
            case 'bun': 
                setCount(bun._id === item._id ? 2 : 0);
                break;
            default:
                setCount(constructorItems.filter((constrItem) => constrItem._id === item._id).length);
                break;
        }
    },[constructorItems, bun]) 

    return (
    <div  ref={drag} style={{ opacity }} className={`${styles.card} mb-8`} onClick={()=>onClickFunc(item._id)}>

        {count!==0 && (<Counter count={count} size="default" />)}

        <img className={'ml-4 mr-4'} alt={item.name} src={item.image}/>

        <div className={styles.price}>
            <span className="text text_type_digits-default">
                {item.price}
            </span>
            <CurrencyIcon type="primary" />
        </div>

        <span className="text text_type_main-default">
            {item.name}
        </span>
    </div>
    );
}

IngredientCard.propTypes = {
    item: PropTypes.object.isRequired,
    onClickFunc: PropTypes.func.isRequired
}
