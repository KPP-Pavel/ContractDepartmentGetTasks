import { applyMiddleware, combineReducers, createStore } from "redux";
import TaskDOReducer from "./reducers/reducer_taskDO";
import thunkMiddleware from "redux-thunk";
//import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    TaskDOForm: TaskDOReducer,
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;