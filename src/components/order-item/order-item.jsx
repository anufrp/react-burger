import React from "react";
import styles from './order-item.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

export default function OrderItem({item, type}) {
    
    switch(type) {          
        case "top": 
        return (<div className={`${styles.item} ${styles.top}`}>
            <ConstructorElement                
                isLocked={true}
                text={item.name + ' (верх)'}
                type='top'
                price={item.price}
                thumbnail={item.image}
            />
        </div>)  

        case "bottom": 
        return (<div className={`${styles.item} ${styles.bottom}`}>
            <ConstructorElement                
                isLocked={true}
                text={item.name + ' (низ)'}
                type='bottom'
                price={item.price}
                thumbnail={item.image}
            />
        </div>)

        default: 
        return (<div className={`${styles.item} mt-4 mb-4`}>
        <DragIcon type='primary'/>
        <ConstructorElement                
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
        />
        </div>)
    };
};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string
};
