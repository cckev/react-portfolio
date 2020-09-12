import React from 'react';
import styles from './Backdrop.module.css';


interface Props {
    //show: boolean;
    onClick: () => void;
}

const Backdrop: React.FC<Props> = props => {
    const { onClick } = props;
    return (
        <div className={styles.Backdrop} onClick={onClick}>
        </div>
    );
}

export default Backdrop;