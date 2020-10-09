import { ProjectsActionTypes } from './actionTypes';
import { ProjectInfo } from '../../types/global';


export const fetchProjectsStart = () => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_START
});

export const fetchProjectsSuccess = (ProjectsMap: { [projectName: string]: ProjectInfo }) => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_SUCCESS,
    payload: ProjectsMap
});

export const fetchProjectsFailure = (errorMessage: Error) => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_FAILURE,
    payload: errorMessage
});

export const filterProjects = (searchText: string) => ({
    type: ProjectsActionTypes.FILTER_PROJECTS,
    payload: searchText
});