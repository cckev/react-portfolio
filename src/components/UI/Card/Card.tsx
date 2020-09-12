import React, { useState } from 'react';
import styles from './Card.module.css';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { getImgURL } from '../../../firebase/firebase.utils';
import Tag from '../Tag/Tag';


interface Props extends RouteComponentProps<any> {
    title: string;
    projectID: string;
    smallImgURL: string;
    shortDesc: string;
    githubLink: string;
    tags: string[];
    recruitersOnly: boolean;
    toggleProjectClicked: (projectID: string) => void;
}

const Card: React.FC<Props> = props => {
    const [imageURL, setImageURL] = useState("");
    const {
        title,
        projectID,
        smallImgURL,
        shortDesc,
        tags,
        recruitersOnly,
        toggleProjectClicked,
    } = props;

    const handleClick = () => {
        toggleProjectClicked(projectID);
    }

    const tagsArray = tags.map((tag: string, i: number) => {
        return <Tag key={+i}>{tag}</Tag>
    })

    const cardDescription = shortDesc.length > 200 ? shortDesc.slice(0, 200) + "..." : shortDesc;


    getImgURL(smallImgURL, setImageURL);

    return (
        <div className={styles.Card} onClick={handleClick}>
            <div className={styles.Image}>
                <img src={imageURL} alt="thumbnail" />
                <p>{recruitersOnly}</p>
            </div>
            <div className={styles.Details}>
                <h1>{title}</h1>
                <p>{cardDescription}</p>
            </div>
            <div className={styles.Tags}>
                {tagsArray}
            </div>
        </div>
    );
}

export default withRouter(Card);