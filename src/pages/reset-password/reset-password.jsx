import React, {useState, useRef, useCallback} from 'react';
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

export default function ResetPasswordPage() {
    const history = useHistory(); 

    const [code, setCode] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

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
                type={passwordVisible ? 'text' : 'password'}
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password || ""}
                name={'password'}
                icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
                ref={passwordRef}
                size={'default'}
                extraClass="pb-6"
                onIconClick={togglePasswordVisible}
                required
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCode(e.target.value)}
                value={code || ""}
                name={'code'}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Button htmlType="submit" type="primary" size="large">
                Сохранить
            </Button>
        </form>
        <div className={styles.bottomLink}>
            <div><p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={login} extraClass={`${styles.buttonSecondary} pl-2`}>Войти</Button>
        </div>
        </div>
    </div>
  );
} 
