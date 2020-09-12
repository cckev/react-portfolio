import React, { useState } from 'react';
import styles from './Modal.module.css';
import { ProjectInfo } from './../../../types/global.d';
import Tag from '../Tag/Tag';
import darkX from '../../../assets/icon-x-dark.png';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import { getImgURL } from '../../../firebase/firebase.utils';

interface Props {
    projectInfo: ProjectInfo
    onClose: () => void;
}

const Modal: React.FC<Props> = props => {
    const [imageURL, setImageURL] = useState("");
    const { projectInfo, onClose } = props;

    const {
        title,
        shortDesc,
        longDesc,
        largeImgURL,
        githubLink,
        recruitersOnly,
        tags,
    } = projectInfo;

    const tagsArray = tags.map((tag: string) => {
        return <Tag>{tag}</Tag>
    })

    getImgURL(largeImgURL, setImageURL);

    return (
        <div className={styles.Modal}>
            <img
                className={styles.Close}
                onClick={onClose}
                src={darkX}
                alt="close" />
            <div className={styles.ImageContainer}>
                <img src={imageURL} alt="" />
            </div>
            <div className={styles.TextContainer}>
                <h1>{title}</h1>
                <div className={styles.Badges}>
                    {recruitersOnly ? <Badge> RECRUITERS ONLY </Badge> : null}
                </div>
                <pre>{shortDesc}</pre>
                <p className={styles.TextBold}>Description: </p>
                <pre>{longDesc}</pre>
                {recruitersOnly ? <pre>
                    *This project is tagged for recruiters only. You must have valid credentials to access the source code. Please refer to the credentials provided on the resume. You are welcome to request credentials if you do not have a copy.
            </pre> : null}
            </div>
            <span className={styles.InlineSpan}>
                <div className={styles.Tags}>
                    {tagsArray}
                </div>
                <Button link={githubLink}>View Code</Button>
            </span>
        </div>
    );
}

export default Modal;