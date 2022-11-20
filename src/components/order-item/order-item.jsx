import React, { useEffect, useState, useRef } from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {getConstructorConfig} from "../../utils/get-config";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'
import { REJECT_CONSTRUCTOR_LIST } from "../../services/actions/actions";

export default function OrderItem({item, type, index, moveCard = ()=>{}}) {

    const [constructorConfig, setConstructorConfig] = useState();

    const dispatch = useDispatch();

    const rejectItem = (item) => {
        dispatch({type: REJECT_CONSTRUCTOR_LIST, item: item});
    }

    
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
            return
        }
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
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
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const refProp = type === "regular" ? { ref: ref } : {}
    
    useEffect(() => {
        setConstructorConfig(getConstructorConfig(item, type));
    }, [item]);

    return constructorConfig && (
        <div style={{ opacity }} {...refProp} className={constructorConfig.className} >
            {type === "regular" && (<DragIcon />)}
            <ConstructorElement {...constructorConfig.props} handleClose = {() => rejectItem(item)} />
        </div>
    )  

};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string
};
