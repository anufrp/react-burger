import React from "react";
import styles from "./app-header.module.css"
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return(
        <header className={styles.menu}>
            <div className={`${styles.menuPart} p-4`}>
                <div className={`${styles.item} text text_type_main-default p-4`}>
                    <BurgerIcon type="primary"/>
                    <p>Конструктор</p>
                </div>
                <div className={`${styles.item} text text_type_main-default text_color_inactive p-4`}>
                    <ListIcon type="secondary"/>
                    <p>Лента заказов</p>
                </div>
            </div>
            <div className={`${styles.logo} p-4`}>
                <Logo />
            </div>     
            <div className={`${styles.menuPart} p-4`}>
                <div className={`${styles.item} text text_type_main-default text_color_inactive p-4`}>
                    <ProfileIcon type="secondary"/>
                    <p>Личный кабинет</p>
                </div>
            </div>
        </header>
    );
}


