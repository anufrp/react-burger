import React, { useCallback} from 'react';
import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

export default function NotFound() {

    const history = useHistory(); 

    const goHome = useCallback(
        () => {
            history.replace({ pathname: '/' });
        },
        [history]
    ); 
    
    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <p className="text text_type_main-medium pb-6" >
                Ошибка 404. Страница не найдена
            </p>
        <div className={`${styles.bottomLink} pb-4`}>
            <div><p className="text text_type_main-default text_color_inactive">Вы можете вернуться на </p></div><Button htmlType="button" type="secondary" size="medium" onClick={goHome} extraClass={`${styles.buttonSecondary} pl-2`}>главную страницу</Button>
        </div>
        </div>
    </div>
  );
} 
