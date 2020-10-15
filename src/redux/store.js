import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer, reducer} from 'redux-form';
import authReducer from './auth-reducer'
import subscribeWsReducer from './ws-reducer'

let reducers = combineReducers({
    form:formReducer,
    auth:authReducer,
    subscribeWs:subscribeWsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;