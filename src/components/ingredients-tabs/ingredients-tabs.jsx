import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-tabs.module.css';
const [ONE, TWO, THREE] = ["one", "two", "three"]

export default function Tabs() {
    const [current, setCurrent] = React.useState(ONE)

    return (
        <div className={`${styles.categories} mb-10`}>
            <Tab value={ONE} active={current === ONE} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value={TWO} active={current === TWO} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value={THREE} active={current === THREE} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}
