import React from 'react';
import styles from './Tag.module.css';

interface Props {

}

const Tag: React.FC<Props> = props => {
    return (
        <div className={styles.Tag}>
            {props.children}
        </div>
    );
}

export default Tag;