import { FILTER_FILMS, FILTER_GENRE, GET_ALL_FILMS, SET_FAIL, SET_LOADING } from "./type";

const initialState = {
	films: [],
	filterFilms: [],
	isFilter: false,
	isError: false,
	loading: true,
	message: ""
};

export const filmReducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_LOADING:
		return { ...state, loading: true };
	case GET_ALL_FILMS:
		return { ...state, loading: false, films: [ ...action.payload ] };
	case SET_FAIL:
		return { ...state, loading: false, isError: true, message: action.payload };
	case FILTER_FILMS: {
		const filter = state.films.filter((el) => el.title.toLowerCase().includes(action.payload.toLowerCase()));
		if (action.payload) {
			return { ...state, isFilter: true, filterFilms: filter };
		}
		return { ...state, isFilter: false };
	}
	case FILTER_GENRE: {
		const filter = state.films.filter((el) => el.genre.toLowerCase().includes(action.payload.toLowerCase()));
		if (action.payload) {
			return { ...state, isFilter: true, filterFilms: filter };
		}
		return { ...state, isFilter: false };
	}
	}

	return state;
};