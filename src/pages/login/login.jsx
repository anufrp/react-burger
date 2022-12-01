import React, {useState, useRef, useCallback} from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import { DROP_LOGIN_ERROR } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/user';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';

export default function LoginPage() {

    const history = useHistory(); 
    const dispatch = useDispatch();
    const {user, loginRequest, loginFailed} = useSelector(store => 
        ({
            user: store.user.user,
            loginRequest: store.user.loginRequest,
            loginFailed: store.user.loginFailed
        }));

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const request = {
            "email": email, 
            "password": password
        };

        dispatch(loginUser(request));
    }

    const closeModal = () => {
        dispatch({type: DROP_LOGIN_ERROR});
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

    if (user.name) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
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
        {
            loginRequest && (<Loader />)
        }

        { 
            loginFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 
