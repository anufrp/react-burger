import React, { useEffect, useState, useRef, FC } from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getConstructorConfig } from "../../utils/get-config";
import styles from "../order-item/order-item.module.css"
import { useDispatch } from "../../hooks";
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { REJECT_CONSTRUCTOR_LIST } from "../../services/actions/constructor";
import { TConstructorConfig } from "../../utils/get-config";
import { TIngredient } from "../../utils/types";
import { Identifier } from 'dnd-core'

type TOrderItemProps = {
    item: TIngredient,
    type: 'top' | 'bottom' | undefined,
    index?: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

type THandler = {
    handlerId: Identifier | null;
    };

const OrderItem: FC<TOrderItemProps> = ({ item, type, index, moveCard }) => {
    
    const [constructorConfig, setConstructorConfig] = useState<TConstructorConfig>();

    const dispatch = useDispatch();

    const rejectItem = (item: TIngredient) => {
        dispatch({type: REJECT_CONSTRUCTOR_LIST, item: item});
    }
    
    //все для сортировки
    const ref = useRef<HTMLDivElement | null>(null);  
    
    const [{ handlerId }, drop] = useDrop<TIngredient, unknown, THandler>({
        accept: "card",
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        }
        },
        hover(item: TIngredient, monitor) {
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

        const clientOffset = monitor.getClientOffset() as any;

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if(hoverIndex !== undefined && dragIndex !== undefined){
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
        
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
        return { item, index }
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging()
        }),
    })
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));


    //для булок не добавляем ref, так они не будут доступны для сортировки
    const refProp = (type !== "top" && type !== "bottom") ? { ref: ref } : {};
    
    useEffect(() => {
        setConstructorConfig(getConstructorConfig(item, type));
    },[item, moveCard]);

    
    useEffect(() => {
        const selectedIngredients = document.querySelector("#selectedIngredients");
        if(selectedIngredients !== null) 
            selectedIngredients.scrollTo({ top: 99999, behavior: 'smooth' });
    },[]);


    return constructorConfig ? (
        <div style={{ opacity }} {...refProp} className={constructorConfig.className} data-handler-id={handlerId} >
            {type !== "top" && type !== "bottom" && (<div className={styles.dragIcon}><DragIcon type="primary" /></div>)}
            <ConstructorElement {...constructorConfig.props} handleClose = {() => rejectItem(item)} />
        </div>
    )  : (<></>)

};

export default OrderItem;
