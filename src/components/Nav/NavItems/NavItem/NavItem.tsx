import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

interface Props {
    to: string;
    exact: boolean;
}

const NavItem: React.FC<Props> = (props) => {
    return (
        <li className={styles.NavItem}>
            <NavLink
                to={props.to}
                exact={props.exact}
            >
                {props.children}
            </NavLink>
        </li>
    );
}

export default NavItem;