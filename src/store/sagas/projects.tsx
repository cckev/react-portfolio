import { takeLatest, call, put, all } from 'redux-saga/effects';
import { convertCollectionSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchProjectsFailure, fetchProjectsSuccess } from '../actions/projects';
import { ProjectsActionTypes } from '../actions/actionTypes';


export function* fetchProjectsAsync() {
    try {
        const projectsRef = firestore.collection('projects');
        const snapshot = yield projectsRef.get();
        const projectsMap = yield call(
            convertCollectionSnapshotToMap,
            snapshot
        )
        yield put(fetchProjectsSuccess(projectsMap));
    } catch (error) {
        yield put(fetchProjectsFailure(error.message));
    }
}

export function* watchFetchProjectsStart() {
    yield takeLatest(
        ProjectsActionTypes.FETCH_PROJECTS_START,
        fetchProjectsAsync
    );
}

export function* projectsSagas() {
    yield all([call(watchFetchProjectsStart)]);
}