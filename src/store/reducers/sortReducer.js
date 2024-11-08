import { TOGGLE_SORT } from '../types/actionTypes';

const initialState = {
	sortAlphabetically: false,
};

const sortReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SORT:
			return {
				...state,
				sortAlphabetically: !state.sortAlphabetically,
			};
		default:
			return state;
	}
};

export default sortReducer;
