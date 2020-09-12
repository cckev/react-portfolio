import React from 'react';
import styles from './NavBar.module.css';

import NavItems from '../NavItems/NavItems';

interface Props {

}

const NavBar: React.FC<Props> = () => {
    return (
        <header className={styles.NavBar}>
            <nav className={styles.NavItems}>
                <NavItems />
            </nav>
        </header>
    );
}

export default NavBar;