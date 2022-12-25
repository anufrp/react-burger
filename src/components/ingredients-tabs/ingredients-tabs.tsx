import React, { useContext, useEffect, useRef } from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-tabs.module.css';
import { BUN, SAUCE, MAIN } from "../../services/constants";
import { activeTabContext } from "../../services/tabsContext";

export default function Tabs() {

    const { activeTabState, activeTabDispatcher } = useContext<any>(activeTabContext);
    const tabsNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        activeTabDispatcher({
            type: 'set_tabs_node',
            ref: tabsNode
        });
    }, [tabsNode]);

    function scrollTo(value: string) {
        activeTabDispatcher({type: "scroll_to", tab: value});
    }

    return (
        <div className={`${styles.categories} mb-10`} ref={tabsNode}>
            <Tab value={BUN} active={activeTabState.activeTab === BUN} onClick={() => scrollTo(BUN)} >
                Булки
            </Tab>
            <Tab value={SAUCE} active={activeTabState.activeTab === SAUCE} onClick={() => scrollTo(SAUCE)} >
                Соусы
            </Tab>
            <Tab value={MAIN} active={activeTabState.activeTab === MAIN} onClick={() => scrollTo(MAIN)} >
                Начинки
            </Tab>
        </div>
    )
}
