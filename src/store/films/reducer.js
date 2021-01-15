import { GET_ALL_FILMS, SET_FAIL, SET_LOADING } from "./type";

const initialState = {
	films: [
		{
			no: "",
			title: "",
			view: "",
			genre: "",
			description: "",
			action: ""
		}
	],
	isError: false,
	loading: false,
	message: ""
};

export const filmReducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_LOADING:
		return { ...state, loading: true };
	case GET_ALL_FILMS:
		return { ...state, loading: false, films: [ ...state.films, ...action.payload ] };
	case SET_FAIL:
		return { ...state, loading: false, isError: true, message: action.payload };
	}

	return state;
};