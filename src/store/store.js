import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import todoReducer from './reducers/todoReducer';
import filterReducer from './reducers/filterReducer';
import sortReducer from './reducers/sortReducer';

const rootReducer = combineReducers({
	todos: todoReducer,
	filter: filterReducer,
	sort: sortReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
