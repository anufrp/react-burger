import React, {useState, useRef} from 'react';
import { isMetaProperty } from 'typescript';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginPage() {

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
                name={'name'}
                error={false}
                ref={emailRef}
                errorText={'Введите E-mail'}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password || ""}
                name={'name'}
                icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
                error={false}
                ref={passwordRef}
                errorText={'Введите пароль'}
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
            <div><p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p></div><Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.buttonSecondary} pl-2`}>Зарегистрироваться</Button>
        </div>
        <div className={styles.bottomLink}>
            <div><p className="text text_type_main-default text_color_inactive">Забыли пароль?</p></div><Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.buttonSecondary} pl-2`}>Восстановить пароль</Button>
        </div>
        </div>
    </div>
  );
} 
