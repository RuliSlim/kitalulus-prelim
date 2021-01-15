import { GET_ALL_FILMS_URL } from "../../lib/url";
import { GET_ALL_FILMS, SET_FAIL, SET_LOADING } from "./type";

export const getAllFilms = () => {
	const action = {
		type: GET_ALL_FILMS
	};

	return callApi(action);
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