import styles from '../components/order-item/order-item.module.css';
import { TIngredient } from './types';

type TConstructorConfigProps = {
    isLocked: boolean,
    text: string,
    type?: 'top' | 'bottom' | undefined,
    price: number,
    thumbnail: string
} 

export type TConstructorConfig = {
    className: string,
    props: TConstructorConfigProps
}

export function getConstructorConfig(item: TIngredient, type: 'top' | 'bottom' | undefined): TConstructorConfig {
        
    switch(type) {          
        case 'top': 
        return {
            className: `${styles.item} ${styles.top}`,
            props:               
                {
                    isLocked: true,
                    text: item.name + ' (верх)',
                    type: type,
                    price: item.price,
                    thumbnail: item.image
                }
            }  

        case 'bottom': 
        return {
            className: `${styles.item} ${styles.bottom}`,
            props:               
                {
                    isLocked: true,
                    text: item.name + ' (низ)',
                    type: type,
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
