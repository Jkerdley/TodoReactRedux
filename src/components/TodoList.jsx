import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadTodos, requestAddTodo, setSearchItem } from '../store/actions/todoActions';
import { toggleSort } from '../store/actions/sortActions';

import { Item } from './Item';
import { debounce } from './utils/Debounce';
import { getFilteredAndSortedTodos } from './utils/SortAndFilterUtility';
import styles from './Todo.module.css';

export const TodoList = () => {
	const todos = useSelector((state) => state.todos.todos);
	const loading = useSelector((state) => state.todos.loading);
	const searchItem = useSelector((state) => state.filter.searchItem);
	const sortAlphabetically = useSelector((state) => state.sort.sortAlphabetically);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTodos());
	}, [dispatch]);

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			dispatch(requestAddTodo(event.target.value));
			event.target.value = '';
		}
	};

	const debouncedSearch = useCallback(
		debounce((value) => {
			dispatch(setSearchItem(value));
		}, 300),
		[dispatch],
	);

	const handleSearchChange = useCallback(
		(event) => {
			debouncedSearch(event.target.value);
		},
		[debouncedSearch],
	);

	const toggleSortAlphabetically = useCallback(() => {
		dispatch(toggleSort());
	}, [dispatch]);

	const filteredAndSortedTodos = getFilteredAndSortedTodos(todos, searchItem, sortAlphabetically);

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.searchItem}
				defaultValue={searchItem}
				onChange={handleSearchChange}
				type="text"
				name="search"
				placeholder="Поиск"
			/>
			<input
				className={styles.input}
				type="text"
				name="title"
				placeholder="Введите задачу"
				onKeyDown={handleKeyPress}
			/>
			<button onClick={toggleSortAlphabetically} className={styles.alphabetButton}>
				{sortAlphabetically ? 'Сортировать по умолчанию' : 'Сортировать А->Я'}
			</button>
			<ul>
				{loading ? (
					<div className={styles.loader} />
				) : filteredAndSortedTodos.length === 0 ? (
					<p className={styles.nothing}>Ничего не найдено</p>
				) : (
					filteredAndSortedTodos.map((todo) => <Item key={todo.id} title={todo.title} id={todo.id} />)
				)}
			</ul>
		</div>
	);
};
