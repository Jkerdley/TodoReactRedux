import { SET_SEARCH } from '../types/actionTypes';

export const setSearchItem = (searchItem) => ({
	type: SET_SEARCH,
	payload: searchItem,
});
