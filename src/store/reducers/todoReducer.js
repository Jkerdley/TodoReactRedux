import { FETCH_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO, SET_LOADING } from '../types/actionTypes';

const initialState = {
	todos: [],
	loading: false,
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODOS:
			return {
				...state,
				todos: action.payload,
				loading: false,
			};

		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};

		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case EDIT_TODO:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo,
				),
			};

		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};

export default todoReducer;
