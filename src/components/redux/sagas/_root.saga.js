import { all, takeEvery } from 'redux-saga/effects';
import getDetailsSaga from './getDetails.saga';
import editSaga from './edit.saga';

// all saga registration
function* rootSaga() {
    console.log('In Watcher Saga');
    yield takeEvery('GET_DETAILS', getDetailsSaga);
    yield takeEvery('SUBMIT', editSaga);
    yield all(
        [
            getDetailsSaga(),
            editSaga(),
        ]
    );
}

export default rootSaga;