import React, {useState, useRef, useCallback} from 'react';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

export default function RegisterPage() {

    const history = useHistory(); 

    const [email, setEmail] = useState('value@burg.er');
    const [name, setName] = useState('BurgLover');
    const [password, setPassword] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const emailRef = useRef(null);
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
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                value={name || ""}
                name={'name'}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email || ""}
                name={'email'}
                ref={emailRef}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder={'Пароль'}
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
            <Button htmlType="submit" type="primary" size="large">
                Зарегистрироваться
            </Button>
        </form>
        <div className={`${styles.bottomLink} pb-4`}>
            <div><p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={login} extraClass={`${styles.buttonSecondary} pl-2`}>Войти</Button>
        </div>
        </div>
    </div>
  );
} 
