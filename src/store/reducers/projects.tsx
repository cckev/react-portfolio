import { ProjectsActionTypes } from '../actions/actionTypes';
import { ProjectInfo } from '../../types/global';

const projectsTemplate: { [projectName: string]: ProjectInfo } = {}

const INITIAL_STATE = {
    projects: projectsTemplate,
    filteredProjects: projectsTemplate,
    isFetching: false,
    errorMessage: undefined
}

const projectContains = (p: ProjectInfo, searchText: string) => {
    if (p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchText.toLowerCase()) ||
        p.tags.join(" ").includes(searchText.toLowerCase())
    )
        return true;
    return false;
}

// TODO: type the action
// https://github.com/actions/typescript-action

const projectsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ProjectsActionTypes.FETCH_PROJECTS_START:
            return {
                ...state,
                isFetching: true
            };
        case ProjectsActionTypes.FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                projects: action.payload,
                filteredProjects: action.payload
            };
        case ProjectsActionTypes.FETCH_PROJECTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case ProjectsActionTypes.FILTER_PROJECTS:
            let filtered: { [projectName: string]: ProjectInfo } = {}
            Object.keys(state.projects).forEach(id => {
                if (projectContains(state.projects[id], action.payload))
                    filtered[id] = state.projects[id]
            })
            return {
                ...state,
                filteredProjects: filtered
            };
        default:
            return state;
    }
}

export default projectsReducer;