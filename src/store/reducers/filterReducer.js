import { SET_SEARCH } from '../types/actionTypes';

const initialState = {
	searchItem: '',
};

const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH:
			return {
				...state,
				searchItem: action.payload,
			};

		default:
			return state;
	}
};

export default filterReducer;
