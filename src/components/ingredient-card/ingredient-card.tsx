import React, { FC, useEffect, useState } from "react";
import { useDrag } from 'react-dnd'
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import { useSelector, useDispatch } from "../../hooks";
import { SET_BUN, TOPUP_CONSTRUCTOR_LIST } from "../../services/actions/constructor";
import { SET_COST } from "../../services/actions/constructor";
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from "../../utils/types";

type TIngredientCardProps = {
    item: TIngredient,
    onClickFunc: (id: string) => void
}

const IngredientCard: FC<TIngredientCardProps> = ({item, onClickFunc}) => { 

    const[count, setCount] = useState<number>(0);

    const dispatch = useDispatch();

    const {constructorItems, bun} = useSelector((store) => 
        ({
            constructorItems: store.constructorItems.constructorItems,
            bun: store.constructorItems.bun
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
                    dispatch({type: SET_COST});
                    break;
                default:
                    dispatch({type: TOPUP_CONSTRUCTOR_LIST, item: {...item, uid: uuidv4()}});
                    dispatch({type: SET_COST});

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
        if(bun)  switch (item.type) {
            case 'bun': 
                setCount(bun._id === item._id ? 2 : 0);
                break;
            default:
                setCount(constructorItems.filter((constrItem: TIngredient) => constrItem._id === item._id).length);
                break;
        }
    },[constructorItems, bun]) 

    return (
    <div ref={drag} style={{ opacity }} className={`${styles.card} mb-8`} onClick={()=>onClickFunc(item._id)} data-testid="ingredient_card">

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

export default IngredientCard;
