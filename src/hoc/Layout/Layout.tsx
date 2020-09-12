import React from 'react';

import styles from './Layout.module.css';
import Auxiliary from './../Auxiliary/Auxiliary';
import NavBar from './../../components/Nav/NavBar/NavBar';

interface Props {

}

const Layout: React.FC<Props> = props => {
    return (
        <Auxiliary>
            <main className={styles.Content}>
                <NavBar />
                {props.children}
            </main>
        </Auxiliary>
    );
}

export default Layout;