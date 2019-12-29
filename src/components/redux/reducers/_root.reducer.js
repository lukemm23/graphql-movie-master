//registration for all reducers
import { combineReducers } from 'redux';
import detailReducer from './detail.reducer';

const rootReducer = combineReducers({
    detailReducer
})

export default rootReducer;