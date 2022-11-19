import React, { useEffect, useState } from "react";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {getConstructorConfig} from "../../utils/get-config";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { REJECT_CONSTRUCTOR_LIST } from "../../services/actions/actions";

export default function OrderItem({item, type}) {

    const [constructorConfig, setConstructorConfig] = useState();

    const dispatch = useDispatch();

    const rejectItem = (item) => {
        dispatch({type: REJECT_CONSTRUCTOR_LIST, item: item});
    }
    
    useEffect(() => {
        setConstructorConfig(getConstructorConfig(item, type));
    }, [item]);

    return constructorConfig && (
        <div className={constructorConfig.className}>
            {type === "regular" && (<DragIcon />)}
            <ConstructorElement {...constructorConfig.props} handleClose = {() => rejectItem(item)} />
        </div>
    )  

};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string
};
