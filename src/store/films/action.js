import { GET_ALL_FILMS_URL } from "../../lib/url";
import { FILTER_FILMS, FILTER_GENRE, GET_ALL_FILMS, SET_FAIL, SET_LOADING } from "./type";

export const getAllFilms = () => {
	const action = {
		type: GET_ALL_FILMS
	};

	return callApi(action);
};

export const filterFilms = (film, type) => (dispatch) => {
	dispatch({
		type: type === "film" ? FILTER_FILMS : FILTER_GENRE,
		payload: film
	});
};

const callApi = (action) => async (dispatch) => {
	try {
		const response = await fetch(GET_ALL_FILMS_URL);
		const result = await response.json();

		dispatch({
			type: SET_LOADING
		});

		setTimeout(() => {
			dispatch({
				type: action.type,
				payload: result,
			});
		}, 3000);
	} catch (error) {
		dispatch({
			type: SET_FAIL,
			payload: error.message
		});
	}
};