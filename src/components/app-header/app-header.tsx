import React from "react";
import styles from "./app-header.module.css"
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useRouteMatch } from "react-router-dom"
import { useSelector } from 'react-redux';


export default function AppHeader() {
    
    const {userName} = useSelector((store: any) => ({userName: store.user.user.name}));

    const isConstructor = !!useRouteMatch({ path: "/", exact: true});
    const isFeed = !!useRouteMatch({ path: "/feed", exact: true});
    const isProfile = !!useRouteMatch({ path: "/profile" });

    return(
        <header className={styles.menu}>
            <div className={`${styles.menuPart} p-4`}>
                <NavLink to="/" exact={true} className={`${styles.item} text text_type_main-default text_color_inactive p-4`} activeClassName={`${styles.active}`}>
                    <BurgerIcon type={isConstructor ? "primary" : "secondary"}/>
                    <span>Конструктор</span>
                </NavLink>
                <NavLink to="/feed" className={`${styles.item} text text_type_main-default text_color_inactive p-4`} activeClassName={`${styles.active}`}>
                    <ListIcon type={isFeed ? "primary" : "secondary"}/>
                    <span>Лента заказов</span>
                </NavLink>
            </div>
            <div className={`${styles.logo} p-4`}>
                <Link to='/'><Logo /></Link>
            </div>     
            <div className={`${styles.menuPart} p-4`}>
                <NavLink to="/profile" className={`${styles.item} text text_type_main-default text_color_inactive p-4`} activeClassName={`${styles.active}`}>
                    <ProfileIcon type={isProfile ? "primary" : "secondary"}/>
                    <span>{userName || "Личный кабинет"}</span>
                </NavLink>
            </div>
        </header>
    );
}


