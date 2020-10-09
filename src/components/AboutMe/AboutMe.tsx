import React from 'react';
import styles from './AboutMe.module.css';

interface Props {

}

const p1 = "At a young age, Kevin loved being behind the camera. His portfolio boasts his friends' childhood basketball mixtapes and skate videos from the blunder years. When adulthood settled in, he assimilated by earning himself a Finance degree from The University of Texas at Austin. Kevin never did wear a suit and tie to work, however. His early career consisted primarily of video production and visual design for start-ups in the tech industry. It was in those early years that he discovered the field of Security, and then took an interest in the theoretical aspects of Computer Science."
const p2 = "Kevin is projected to graduate with a Master's in Computer Science from The University of Texas at Austin in 2021. When he is not programming in front of his computer or scribbling proofs on notebook paper, you can find him in the living room, waiting out the pandemic and doing squats with Ozarka water jugs."
const p3 = "Feel free to contact me at kevchen724 at g mail dot com"

const AboutMe: React.FC<Props> = () => {
    return (
        <div className={styles.PageWrapper}>
            <div className={styles.PageTitle}>
                <h1>About Me</h1>
            </div>
            <div className={styles.AboutMe}>
                <div className={styles.Pic}>
                    <img className={styles.ProfilePic} src="https://media-exp1.licdn.com/dms/image/C4E03AQE4v_4ALRBl4A/profile-displayphoto-shrink_200_200/0?e=1605139200&v=beta&t=s49v-bHtELlWi9oCDZcAVHISCaLIK5cGMSER0KRHCiU" alt="" />
                </div>
                <div className={styles.Bio}>
                    <p>{p1}</p>
                    <p>{p2}</p>
                    <p>{p3}</p>
                </div>

            </div>
        </div>
    );
}

export default AboutMe;