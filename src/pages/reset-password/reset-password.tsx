import React, {useState, useCallback, FormEvent, FC} from 'react';
import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, Redirect } from 'react-router-dom';
import { DROP_RESET_PASSWORD_ERROR } from '../../services/actions/user';
import { useDispatch, useSelector } from "../../hooks";
import { resetPassword } from '../../services/actions/user';
import Loader from '../../components/loader/loader';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import { useForm } from '../../services/hooks/useForm';

const ResetPasswordPage: FC = () => {
    const history = useHistory(); 
    const dispatch = useDispatch();   
    const {passwordReseted, resetPasswordRequest, resetPasswordFailed, forgotEmailCheck} = useSelector((store: any) => 
        ({
            passwordReseted: store.user.passwordReseted,
            resetPasswordRequest: store.user.resetPasswordRequest,
            resetPasswordFailed: store.user.resetPasswordFailed,
            forgotEmailCheck: store.user.forgotEmailCheck
        }));
        
    const {values, handleChange, setValues} = useForm({ code: null, password: null});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const request = values;

        dispatch(resetPassword(request));
    }

    const closeModal = () => {
        dispatch({type: DROP_RESET_PASSWORD_ERROR});
    }

    const login = useCallback(
        () => {
            history.push({ pathname: '/login' });
        },
        [history]
    ); 

    //если не было успешной проверки email, то возвращаем на страниу ввода email
    if (!forgotEmailCheck) {
        return (
          <Redirect
            to={{
              pathname: '/forgot-password'
            }}
          />
        );
      }

    if (passwordReseted) {
        return (
          <Redirect
            to={{
              pathname: '/login'
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
                type={passwordVisible ? 'text' : 'password'}
                placeholder={'Введите новый пароль'}
                onChange={handleChange}
                value={values.password || ""}
                name={'password'}
                icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
                size={'default'}
                extraClass="pb-6"
                onIconClick={togglePasswordVisible}
                required
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={handleChange}
                value={values.code || ""}
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
        {
            resetPasswordRequest && (<Loader />)
        }

        { 
            resetPasswordFailed && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 

export default ResetPasswordPage;
