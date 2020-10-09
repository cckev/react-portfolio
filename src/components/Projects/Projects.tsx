import React, { useState, useEffect, Dispatch } from 'react';
import styles from './Projects.module.css';

import Project from './Project/Project';
import Stage from './Stage/Stage';
import SearchBar from '../Nav/SearchBar/SearchBar';

import { ProjectInfo, ProjectsState } from '../../types/global';
import { useHistory } from 'react-router-dom';
import { customEncodeURI } from '../../firebase/firebase.utils';
import { fetchProjectsStart } from '../../store/actions/projects';
import { connect } from 'react-redux';


//// The following imports needed for programatically uploading to firebase
// import { addCollectionAndDocuments } from '../../firebase/firebase.utils';
// import { PROJECT_DATA } from '../../PROJECT_DATA';


interface Props {
    filteredProjects: { [name: string]: ProjectInfo };
    fetchProjectsStart: () => void;
}

const Projects: React.FC<Props> = props => {
    const { filteredProjects, fetchProjectsStart } = props;
    const [projectClicked, setProjectClicked] = useState(false);
    const [projectID, setProjectID] = useState("");
    const history = useHistory();

    // Utility function for uploading course data to firebase
    // useEffect(() => {
    //     addCollectionAndDocuments('projects', PROJECT_DATA);
    // }, []);

    useEffect(() => {
        fetchProjectsStart();
    }, [fetchProjectsStart]);


    const toggleProjectClicked = (id: string) => {
        setProjectClicked(true);
        setProjectID(id);
        history.push(`/projects/${id}`);
    }

    const toggleStage = () => {
        setProjectClicked(false);
        setProjectID("");
        history.push("/projects");
    }

    let projectsArray: JSX.Element[] = [];
    if (filteredProjects) {
        Object.keys(filteredProjects).forEach(key => {
            let p = filteredProjects[key]
            projectsArray.push(
                <Project
                    title={p.title}
                    projectID={customEncodeURI(p.title)}
                    key={p.title}
                    shortDesc={p.shortDesc}
                    smallImgURL={p.smallImgURL}
                    largeImgURL={p.largeImgURL}
                    tags={p.tags}
                    githubLink={p.githubLink}
                    recruitersOnly={p.recruitersOnly}
                    toggleProjectClicked={toggleProjectClicked}
                />
            );
        })
    }

    return (
        <div className={styles.PageWrapper}>
            <h1>Projects</h1>
            <div className={styles.SearchDiv}>
                <SearchBar />
            </div>
            {
                projectClicked ?
                    <Stage
                        projectInfo={filteredProjects[projectID]}
                        toggleStage={toggleStage}
                    />
                    : null
            }
            <div className={styles.Projects}>
                {projectsArray}
            </div>
        </div>
    );
}

const mapStateToProps = (state: ProjectsState) => ({
    filteredProjects: state.filteredProjects
})

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => ({
    fetchProjectsStart: () => dispatch(fetchProjectsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);