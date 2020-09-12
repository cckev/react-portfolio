import React from 'react';
import styles from './Button.module.css';

interface Props {
    link: string;
}

const Button: React.FC<Props> = props => {
    const { link } = props;
    return (
        <div className={styles.Button}>
            <a href={link} target="_blank" rel="noopener noreferrer">{props.children}</a>
        </div>
    );
}

export default Button;