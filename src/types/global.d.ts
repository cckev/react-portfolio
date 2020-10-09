
/**
 * Projects Types
 */

export interface ProjectInfo {
    title: string,
    shortDesc: string,
    smallImgURL: string,
    largeImgURL: string,
    githubLink: string,
    recruitersOnly: boolean,
    tags: string[]
}

export interface ProjectCard {
    title: string,
    desc: string,
    smallImgURL: string,
    largeImgURL: string,
    recruitersOnly: boolean,
    projectID?: string,
    toggleProjectClicked?: (projectID: string) => void;
}

export type ProjectsState = {
    projects: { [name: string]: ProjectInfo },
    filteredProjects: { [name: string]: ProjectInfo },
    isFetching: false,
    errorMessage: undefined
}


/**
 * State
 */
export type AppState = {
    projects: ProjectsState;
};


declare module "*.md";