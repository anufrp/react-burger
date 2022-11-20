import React, { useEffect, useState, useRef } from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {getConstructorConfig} from "../../utils/get-config";
import styles from "../order-item/order-item.module.css"
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'
import { REJECT_CONSTRUCTOR_LIST } from "../../services/actions/actions";

export default function OrderItem({ item, type, index, moveCard }) {
    
    const [constructorConfig, setConstructorConfig] = useState();

    const dispatch = useDispatch();

    const rejectItem = (item) => {
        dispatch({type: REJECT_CONSTRUCTOR_LIST, item: item});
    }
    
    //все для сортировки
    const ref = useRef(null)
    
    const [{ handlerId }, drop] = useDrop({
        accept: "card",
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        }
        },
        hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
            return;
        }
        
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        
        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
        return { item, index }
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    //для булок не добавляем ref, так они не будут доступны для сортировки
    const refProp = type === "regular" ? { ref: ref } : {};
    
    useEffect(() => {
        setConstructorConfig(getConstructorConfig(item, type));
    }, [moveCard, item]);

    
    useEffect(() => {
        const selectedIngredients = document.querySelector("#selectedIngredients");
        if(selectedIngredients !== null) 
            selectedIngredients.scrollTo({ top: 99999, behavior: 'smooth' });
    },[])

    return constructorConfig && (
        <div style={{ opacity }} {...refProp} className={constructorConfig.className} data-handler-id={handlerId} >
            {type === "regular" && (<div className={styles.dragIcon}><DragIcon /></div>)}
            <ConstructorElement {...constructorConfig.props} handleClose = {() => rejectItem(item)} />
        </div>
    )  

};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string
};
