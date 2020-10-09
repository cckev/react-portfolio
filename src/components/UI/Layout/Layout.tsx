import React from 'react';

import styles from './Layout.module.css';
import NavBar from '../../Nav/NavBar/NavBar';

interface Props {

}

const Layout: React.FC<Props> = props => {
    return (
        <>
            <main className={styles.Content}>
                <NavBar />
                {props.children}
            </main>
        </>
    );
}

export default Layout;