import React from 'react';
import styles from './Badge.module.css';

interface Props {

}

const Badge: React.FC<Props> = props => {
    return (
        <span className={styles.Badge}>
            {props.children}
        </span>
    );
}

export default Badge;