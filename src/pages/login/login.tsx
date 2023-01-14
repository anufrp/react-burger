import React, { useState, useCallback, FormEvent, FC } from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import { DROP_LOGIN_ERROR } from '../../services/actions/user';
import { useDispatch, useSelector } from "../../hooks";
import { loginUser } from '../../services/actions/user';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import { useForm } from '../../services/hooks/useForm';

const LoginPage: FC = () => {

    const history = useHistory(); 
    const dispatch = useDispatch();
    const {loginRequest, loginFailed} = useSelector((store: any) => 
        ({
            loginRequest: store.user.loginRequest,
            loginFailed: store.user.loginFailed
        }));

    const {values, handleChange, setValues} = useForm({ email: null, password: null});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const request = values;

        dispatch(loginUser(request));
    }

    const closeModal = () => {
        dispatch({type: DROP_LOGIN_ERROR});
    }


    const register = useCallback(
        () => {
            history.push({ pathname: '/register' });
        },
        [history]
      ); 

    const forgotPassword = useCallback(
        () => {
            history.push({ pathname: '/forgot-password' });
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
                onChange={handleChange}
                value={values.email || ""}
                name={'email'}
                size={'default'}
                extraClass="pb-6"
                required
            />
            <Input
                type={passwordVisible ? 'text' : 'password'}
                placeholder={'Пароль'}
                onChange={handleChange}
                value={values.password || ""}
                name={'password'}
                icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
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
        {
            loginRequest && (<Loader />)
        }

        { 
            loginFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 

export default LoginPage;
