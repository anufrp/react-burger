import React, {useState, useRef, useCallback} from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {

    const history = useHistory(); 

    const [email, setEmail] = useState('value@burg.er');
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

    const register = useCallback(
        () => {
            history.replace({ pathname: '/register' });
        },
        [history]
      ); 

    const forgotPassword = useCallback(
        () => {
            history.replace({ pathname: '/forgot-password' });
        },
        [history]
    ); 
    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
        <form className={`${styles.form} pb-20`} onSubmit={formSubmit}>
            <p className="text text_type_main-medium pb-6" >
                Вход
            </p>
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
                Войти
            </Button>
        </form>
        <div className={`${styles.bottomLink} pb-4`}>
            <div><p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={register} extraClass={`${styles.buttonSecondary} pl-2`}>Зарегистрироваться</Button>
        </div>
        <div className={styles.bottomLink}>
            <div><p className="text text_type_main-default text_color_inactive">Забыли пароль?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={forgotPassword} extraClass={`${styles.buttonSecondary} pl-2`}>Восстановить пароль</Button>
        </div>
        </div>
    </div>
  );
} 
