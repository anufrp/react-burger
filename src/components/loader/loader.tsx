import React, { FC } from "react";
import styles from "./loader.module.css"
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ColorRing } from  'react-loader-spinner'

const Loader: FC = () => {

    return (
            <>
            
                <ModalOverlay onClickFunc={() => {}}/>

                <div className={`${styles.modal} mt-10`}>   
                    <ColorRing
                    visible={true}
                    height="280"
                    width="280"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#463d72','#463d72','#463d72','#463d72','#463d72']}
                    />             
                    <span className="text text_type_main-default">Подождите...</span>
                </div>
            </>
    );
}

export default Loader;
