import React, {useState, useRef, useEffect} from 'react';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';

export default function ProfilePage() {

    const initState = {
        name: 'BurgLover',
        email: 'value@burg.er',
        password: ''
    }
    const [name, setName] = useState(initState.name);
    const [email, setEmail] = useState(initState.email);
    const [password, setPassword] = useState(initState.password);
    const [isEdit, setIsEdit] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('subm');
        setIsEdit(false);
    }

    const formReset = (e) => {
        e.preventDefault();
        setName(initState.name);
        setEmail(initState.email);
        setPassword(initState.password);
        setIsEdit(false);
    }
    
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <nav className={styles.menu}>
                <Link className={`${styles.lnk} ${styles.activeLnk} text text_type_main-medium`}>Профиль</Link>
                <Link className={`${styles.lnk} text text_type_main-medium text_color_inactive`}>История заказов</Link>
                <Link className={`${styles.lnk} text text_type_main-medium text_color_inactive`}>Выход</Link>    
                <p className={`${styles.hint} text text_type_main-default mt-20`}>В этом разделе вы можете <br/>изменить свои персональные данные</p>            
            </nav>
            <form className={`${styles.form} pb-20`} onSubmit={formSubmit} onReset={formReset}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name || ""}
                    name={'name'}
                    ref={nameRef}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setName("") : setIsEdit(true)}
                    disabled={!isEdit}
                    required
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setEmail(e.target.value)}
                    value={email || ""}
                    name={'email'}
                    ref={emailRef}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setEmail("") : setIsEdit(true)}
                    disabled={!isEdit}
                    required
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    value={password || ""}
                    name={'password'}
                    ref={passwordRef}
                    size={'default'}
                    extraClass="pb-6"
                    icon={isEdit ? "CloseIcon" : "EditIcon"}
                    onIconClick={() => isEdit ? setPassword("") : setIsEdit(true)}
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
    </div>
  );
} 
