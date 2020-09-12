import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import { ProjectInfo } from '../../../types/global';

interface Props {
    projectInfo: ProjectInfo;
    toggleStage: () => void;
}

const Stage: React.FC<Props> = props => {
    const { toggleStage } = props;
    return (
        <>
            <Backdrop onClick={toggleStage} />
            <Modal projectInfo={props.projectInfo} onClose={toggleStage} />
        </>
    );
}

export default Stage;