import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser, getProfile, DROP_GET_PROFILE_ERROR, updateProfile } from '../../services/actions/user';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/error-message';
import Loader from '../../components/loader/loader';
import { useSelector } from 'react-redux';
import { DROP_LOGOUT_ERROR } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

export default function ProfilePage() {

    const history = useHistory(); 
    const dispatch = useDispatch();
    const {
            user, 
            logoutRequest, 
            logoutFailed, 
            getProfileRequest, 
            getProfileFailed,
            updateProfileRequest, 
            updateProfileFailed,
        } = useSelector(store => 
        ({
            user: store.user.user,
            logoutRequest: store.user.logoutRequest,
            logoutFailed: store.user.logoutFailed,
            getProfileRequest: store.user.getProfileRequest,
            getProfileFailed: store.user.getProfileFailed,
            updateProfileRequest: store.user.updateProfileRequest,
            updateProfileFailed: store.user.updateProfileFailed
        }));

    const initialState = {
        name: '',
        email: '',
        password: ''
    };
    const [userProfile, setUserProfile] = useState(initialState);
    // const [email, setEmail] = useState(null);
    // const [password, setPassword] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('subm');
        const data = {
            name: userProfile.name,
            email: userProfile.email,
            password: userProfile.password
        }
        dispatch(updateProfile(data));
        setIsEdit(false);
    }

    const formReset = (e) => {
        e.preventDefault();
        setUserProfile({
            ...user,
            password: ''
        });
        setIsEdit(false);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        setUserProfile(initialState);
        console.log('logout is done');
    }

    const closeModal = () => {
        dispatch({type: DROP_LOGOUT_ERROR});
        dispatch({type: DROP_GET_PROFILE_ERROR});
    }

    const accessToken = getCookie('accessToken');

    useEffect(() => { 
        if(accessToken !== undefined) {
            dispatch(getProfile());
            if(user.name) setUserProfile({...user, password: ''});
        }        
    },[]);

    useEffect(() => {
        setUserProfile(user);
    },[user]);

    // if (accessToken === undefined) {
    //     return (
    //       <Redirect
    //         to={{
    //           pathname: '/login',
    //           state: { from: '/profile' }
    //         }}
    //       />
    //     );
    //   }


    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <nav className={styles.menu}>
                <Link to={"/profile"} className={`${styles.lnk} ${styles.activeLnk} text text_type_main-medium`}>Профиль</Link>
                <Link to={"/profile"} className={`${styles.lnk} text text_type_main-medium text_color_inactive`}>История заказов</Link>
                <a href={"/"} onClick={logout} className={`${styles.lnk} text text_type_main-medium text_color_inactive`}>Выход</a>    
                <p className={`${styles.hint} text text_type_main-default mt-20`}>В этом разделе вы можете <br/>изменить свои персональные данные</p>            
            </nav>
            <form className={`${styles.form} pb-20`} onSubmit={formSubmit} onReset={formReset}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setUserProfile({...userProfile, name: e.target.value})}
                    value={userProfile.name || ""}
                    name={'name'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setUserProfile({...userProfile, name: initialState.name}) : setIsEdit(true)}
                    disabled={!isEdit}
                    required
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setUserProfile({...userProfile, email: e.target.value})}
                    value={userProfile.email || ""}
                    name={'email'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setUserProfile({...userProfile, email: initialState.email}) : setIsEdit(true)}
                    disabled={!isEdit}
                    required
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setUserProfile({...userProfile, password: e.target.value})}
                    value={userProfile.password || ""}
                    name={'password'}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setUserProfile({...userProfile, password: initialState.password}) : setIsEdit(true)}
                    disabled={!isEdit}
                    required
                />
                { isEdit &&
                    (<div className={`${styles.bottomBtns}`}>
                        <Button htmlType="reset" type="secondary" size="medium">
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>)
                }
            </form>
        </div>
        {
            (getProfileRequest || logoutRequest || updateProfileRequest) && (<Loader />)
        }

        { 
            (getProfileFailed || logoutFailed || updateProfileFailed) && (<Modal closeFunc={closeModal}><ErrorMessage>Попробуйте позже...</ErrorMessage></Modal>)
        }
    </div>
  );
} 
