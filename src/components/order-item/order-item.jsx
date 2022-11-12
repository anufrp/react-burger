import React from "react";
import styles from './order-item.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {GetConstructorConfig} from "../../utils/get-config";
import PropTypes from "prop-types";

export default function OrderItem({item, type}) {

    const [constructorConfig, setConstructorConfig] = React.useState();
    
    React.useEffect(() => {
        setConstructorConfig(GetConstructorConfig(item, type));
    }, [item]);

    return constructorConfig && (
        <div className={constructorConfig.className}>
            {type === "regular" && (<DragIcon />)}
            <ConstructorElement {...constructorConfig.props} />
        </div>
    )  

};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string
};
