export const getFilteredAndSortedTodos = (todos, searchItem, sortAlphabetically) => {
	return todos
		.filter((todo) => todo.title.toLowerCase().includes(searchItem.toLowerCase()))
		.sort((a, b) => {
			if (sortAlphabetically) {
				return a.title.localeCompare(b.title);
			}
			return 0;
		});
};
