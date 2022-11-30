import React, {useState, useRef, useCallback} from 'react';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const history = useHistory(); 

    const [email, setEmail] = useState('value@burg.er');
    const emailRef = useRef(null);

    const formSubmit = (e) => {
        e.preventDefault();
    }
    const login = useCallback(
        () => {
            history.replace({ pathname: '/login' });
        },
        [history]
    ); 
    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
        <form className={`${styles.form} pb-20`} onSubmit={formSubmit}>
            <p className="text text_type_main-medium pb-6" >
                Восстановление пароля
            </p>
            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email || ""}
                name={'email'}
                ref={emailRef}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Button htmlType="submit" type="primary" size="large">
                Восстановить
            </Button>
        </form>
        <div className={`${styles.bottomLink} pb-4`}>
            <div><p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={login} extraClass={`${styles.buttonSecondary} pl-2`}>Войти</Button>
        </div>
        </div>
    </div>
  );
} 
