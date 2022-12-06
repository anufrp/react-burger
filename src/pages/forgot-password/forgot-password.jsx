import React, {useState, useRef, useCallback} from 'react';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import { DROP_CHEK_EMAIL_ERROR } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/user';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../services/hooks/useForm';

export default function ForgotPasswordPage() {
    const history = useHistory(); 
    const location = useLocation();
    const dispatch = useDispatch();   
    const {user, forgotEmailCheck, forgotEmailCheckRequest, forgotEmailCheckFailed} = useSelector(store => 
        ({
            user: store.user.user,
            forgotEmailCheck: store.user.forgotEmailCheck,
            forgotEmailCheckRequest: store.user.forgotEmailCheckRequest,
            forgotEmailCheckFailed: store.user.forgotEmailCheckFailed
        }));

    const {values, handleChange, setValues} = useForm({ email: '' });
    const emailRef = useRef(null);

    const formSubmit = (e) => {
        e.preventDefault();
        const request = {
            "email": values.email
        };

        dispatch(forgotPassword(request));
    }

    const closeModal = () => {
        dispatch({type: DROP_CHEK_EMAIL_ERROR});
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
            to={ location.state?.from || '/' }
          />
        );
    }
    
    if (forgotEmailCheck) {
        return (
          <Redirect
            to={{
              pathname: '/reset-password'
            }}
          />
        );
      }
    
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
                onChange={handleChange}
                value={values.email || ""}
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
        {
            forgotEmailCheckRequest && (<Loader />)
        }

        { 
            forgotEmailCheckFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 
