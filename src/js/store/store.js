import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/rootReducer';
import { foundBadWordMiddleware } from '../middleware/middleware';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import apiSaga from '../saga/saga';

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(foundBadWordMiddleware, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);

export default store;