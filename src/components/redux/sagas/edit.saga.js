import getDetailsSaga from './getDetails.saga';
import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

//axio PUT to update title and description on edit page
function* edit(action) {
    try {
         yield axios({
            method: 'PUT',
            url: '/api/movies/' + action.payload.id,
            data: {title: action.payload.title,
            description: action.payload.description}
        });
        yield call(getDetailsSaga);
        yield put ({
            type: 'GET_ITEM_DETAIL',
            payload: action.payload.title
        })
        yield call(action.payload.callBack);
       
    } catch (err) {
        console.log('error fetching movies: ', err);
    }
}

// ONLY FOR REGISTRATION
function* editSaga() {
    yield takeLatest('SUBMIT', edit);
}

export default editSaga;