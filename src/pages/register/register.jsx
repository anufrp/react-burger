import React, {useState, useRef, useCallback} from 'react';
import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/actions/user';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import Loader from '../../components/loader/loader';
import { useSelector } from 'react-redux';
import { DROP_REGISTER_ERROR } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';

export default function RegisterPage() {

    const history = useHistory(); 
    const dispatch = useDispatch();
    const {user, registerUserRequest, registerUserFailed} = useSelector(store => 
        ({
            user: store.user.user,
            registerUserRequest: store.user.registerUserRequest,
            registerUserFailed: store.user.registerUserFailed
        }));

    const {values, handleChange, setValues} = useForm({ email: '', name: '', password: null});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const newUserData = values;

        dispatch(registerUser(newUserData));
    }

    const closeModal = () => {
        dispatch({type: DROP_REGISTER_ERROR});
    }

    const login = useCallback(
        () => {
            history.push({ pathname: '/login' });
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
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                value={values.name || ""}
                name={'name'}
                size={'default'}
                extraClass="pb-6"
                required
            />
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
                Зарегистрироваться
            </Button>
        </form>
        <div className={`${styles.bottomLink} pb-4`}>
            <div><p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p></div><Button htmlType="button" type="secondary" size="medium" onClick={login} extraClass={`${styles.buttonSecondary} pl-2`}>Войти</Button>
        </div>
        </div>
        {
            registerUserRequest && (<Loader />)
        }

        { 
            registerUserFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 
