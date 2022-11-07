import styles from '../components/order-item/order-item.module.css';

export function GetConstructorConfig(item, type) {
        
    switch(type) {          
        case "top": 
        return {
            className: `${styles.item} ${styles.top}`,
            props:               
                {
                    isLocked: true,
                    text: item.name + ' (верх)',
                    type: 'top',
                    price: item.price,
                    thumbnail: item.image
                }
            }  

        case "bottom": 
        return {
            className: `${styles.item} ${styles.bottom}`,
            props:               
                {
                    isLocked: true,
                    text: item.name + ' (низ)',
                    type: 'bottom',
                    price: item.price,
                    thumbnail: item.image
                }
            }

        default: 
        return {
            className: `${styles.item} mt-4 mb-4`,
            props:               
                {
                    isLocked: false,
                    text: item.name,
                    price: item.price,
                    thumbnail: item.image
                }
            }
    };

};