import React from 'react';

import Card from '../../UI/Card/Card';
import styles from './Project.module.css';
import { ProjectInfo } from './../../../types/global.d';

interface Props extends ProjectInfo {
    projectID: string;
    toggleProjectClicked: (projectID: string) => void;
}

const Project: React.FC<Props> = props => {
    const {
        title,
        projectID,
        shortDesc,
        smallImgURL,
        tags,
        githubLink,
        recruitersOnly,
        toggleProjectClicked
    } = props;

    return (
        <div className={styles.Project}>
            <Card
                title={title}
                projectID={projectID}
                shortDesc={shortDesc}
                smallImgURL={smallImgURL}
                tags={tags}
                githubLink={githubLink}
                recruitersOnly={recruitersOnly}
                toggleProjectClicked={toggleProjectClicked}
            />
        </div>

    );
}

export default Project;