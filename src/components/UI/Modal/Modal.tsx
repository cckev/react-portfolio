import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { ProjectInfo } from '../../../types/global';
import Tag from '../Tag/Tag';
import darkX from '../../../assets/icon-x-dark.png';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import { getImgURL, customEncodeURI } from '../../../firebase/firebase.utils';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../CodeBlock/CodeBlock";


interface Props {
  projectInfo: ProjectInfo
  onClose: () => void;
}

const Modal: React.FC<Props> = props => {
  const [imageURL, setImageURL] = useState("");
  const [mdText, setMdText] = useState("");
  const { projectInfo, onClose } = props;

  const {
    title,
    shortDesc,
    largeImgURL,
    githubLink,
    recruitersOnly,
    tags,
  } = projectInfo;


  useEffect(() => {
    getImgURL(largeImgURL, setImageURL);
    const URI = customEncodeURI(title);
    const mdFile = require(`../../../markdown/${URI}.md`)
    fetch(mdFile).then(res => res.text()).then(text => setMdText(text))
  }, [largeImgURL, title])

  const tagsArray = tags.map((tag: string) => {
    return <Tag key={tag}>{tag}</Tag>
  })

  const recruitersOnlyNote = "*This project is tagged for recruiters only. To access the source code, you must be logged into Github using the collaborator credentials provided in the footer of my resume. You are welcome to request credentials if you do not have a copy!"
  const buttonText = title.toLowerCase().includes("blog") ? "View" : "View Code"


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
        <p>{shortDesc}</p>
        <p className={styles.TextBold}>Description: </p>
        <ReactMarkdown
          source={mdText}
          renderers={{ code: CodeBlock }}
        />
        {recruitersOnly ? <pre>{recruitersOnlyNote}</pre> : null}
      </div>
      <span className={styles.InlineSpan}>
        <div className={styles.Tags}>
          {tagsArray}
        </div>
        <Button link={githubLink}>{buttonText}</Button>
      </span>
    </div>
  );
}

export default Modal;