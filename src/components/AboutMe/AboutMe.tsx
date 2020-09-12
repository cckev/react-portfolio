import React from 'react';
import styles from './AboutMe.module.css';

interface Props {

}

const p1 = "At a young age, Kevin loved being behind the camera. His portfolio boasts of 8-year old basketball mixtapes and skate videos from his blunder years. When adulthood settled in, he assimilated by earning himself a Finance degree from The University of Texas at Austin. Kevin never did get to wear a suit and tie to work, however. His early career consisted primarily of video production and visual design for start-ups in the tech industry. It was in those early years that he discovered the field of Security, and then took an interest in the theoretical aspects of Computer Science."
const p2 = "Kevin is projected to graduate with a Master's in Computer Science from The University of Texas at Austin in 2021. When he is not programming in front of his computer or scribbling proofs on notebook paper, you can find him in the living room, waiting out the pandemic and doing squats with 2.5 gallon Ozarka jugs."

const AboutMe: React.FC<Props> = () => {
    return (
        <div className={styles.PageWrapper}>
            <div className={styles.PageTitle}>
                <h1>About Me</h1>
            </div>
            <div className={styles.AboutMe}>
                <div className={styles.Pic}>
                    <img className={styles.ProfilePic} src="" alt="" />
                </div>
                <div className={styles.Bio}>
                    <p>{p1}</p>
                    <p>{p2}</p>
                </div>

            </div>
        </div>
    );
}

export default AboutMe;