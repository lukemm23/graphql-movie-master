import axios from 'axios';
import { put, call } from 'redux-saga/effects';

//GET saga for movie list
function* getDetails(action) {
    try {
        console.log('running?');
        const response = yield axios({
            method: 'GET',
            url: '/api/movies/details'
        });
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        });
    } catch (err) {
        console.log('error fetching movies: ', err);
    }
}

// ONLY FOR REGISTRATION
function* getDetailsSaga() {
    console.log('paolema');
    yield call(getDetails);
    
}

export default getDetailsSaga;