import React, { useState, useEffect, Dispatch } from 'react';
import styles from './Projects.module.css';

import Project from './Project/Project';

import { ProjectsState } from './../../types/global.d';
import { useHistory } from 'react-router-dom';
import Stage from './Stage/Stage';
import { customEncodeURI } from '../../firebase/firebase.utils';
import { fetchProjectsStart } from '../../store/actions/projects';
import { connect } from 'react-redux';
import SearchBar from '../Nav/SearchBar/SearchBar';

//// The following imports needed for programatically uploading to firebase
// import { addCollectionAndDocuments } from '../../firebase/firebase.utils';
// import { PROJECT_DATA } from '../../PROJECT_DATA';


interface Props {
    projectsState: ProjectsState;
    fetchProjectsStart: () => void;
}


const Projects: React.FC<Props> = props => {
    const { projectsState, fetchProjectsStart } = props;
    const [projectClicked, setProjectClicked] = useState(false);
    const [projectID, setProjectID] = useState("");
    const projects = projectsState.filteredProjects;
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
    if (projects) {
        Object.keys(projects).forEach(key => {
            let p = projects[key]
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
                        projectInfo={projects[projectID]}
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
    projectsState: state
})

const mapDispatchToProps = (dispatch: Dispatch<{ type: string }>) => ({
    fetchProjectsStart: () => dispatch(fetchProjectsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);