import { FETCH_TODOS, ADD_TODO, DELETE_TODO, EDIT_TODO, SET_LOADING, SET_SEARCH } from '../types/actionTypes';
import { API_URL } from '../../components/utils/ApiUrl';

export const loadTodos = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch(API_URL);
		const todos = await response.json();
		dispatch({ type: FETCH_TODOS, payload: todos });
	} catch (error) {
		console.error('Error fetching todos:', error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const requestAddTodo = (title) => async (dispatch) => {
	if (title) {
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ title, completed: false }),
			});

			const newTodo = await response.json();

			dispatch({ type: ADD_TODO, payload: newTodo });
		} catch (error) {
			console.error('Error adding todo:', error);
		}
	} else {
		alert('Пожалуйста введите текст задачи');
	}
};

export const requestDeleteTodoItem = (id) => async (dispatch) => {
	if (!id) {
		console.error('Идентификатор задачи не указан');
		return;
	}
	try {
		await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
		dispatch({ type: DELETE_TODO, payload: id });
	} catch (error) {
		console.error('Error deleting todo:', error);
	}
};

export const requestEditTodoItem = (id, title) => async (dispatch) => {
	if (!id) {
		console.error('ID задачи не указан');
		return;
	}
	const newTitle = prompt('Введите новый текст задачи', title);
	if (newTitle) {
		try {
			await fetch(`${API_URL}/${id}`, {
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ title: newTitle }),
			});
			dispatch({ type: EDIT_TODO, payload: { id, title: newTitle } });
		} catch (error) {
			console.error('Error editing todo:', error);
		}
	}
};

export const setLoading = (isLoading) => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const setSearchItem = (searchItem) => ({
	type: SET_SEARCH,
	payload: searchItem,
});
