import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
// Provider allows us to use redux within our react app
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// // Import saga middleware
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './components/redux/reducers/_root.reducer';
// import rootSaga from './components/redux/sagas/_root.saga';


// Create sagaMiddleware
// const sagaMiddleware = createSagaMiddleware();
const detailReducer = (state={id:'', name:'', poster:'', description:'', genreId:''}, action)=>{
    if (action.type === 'GET_DETAIL') {
        return {
            id:action.payload.id,
            name: action.payload.name,
            poster: action.payload.poster,
            description: action.payload.description,
            genreId: action.payload.genreId
        };
    }
    return state;
}
// Create one store that all components can use
const storeInstance = createStore(
    detailReducer,
    // Add sagaMiddleware to our store
    applyMiddleware(
        // sagaMiddleware, 
        logger
    )
);

// Pass rootSaga into our sagaMiddleware
// sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
