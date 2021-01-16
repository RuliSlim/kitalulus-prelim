import { GET_ALL_FILMS_URL, SAVE_FILM_URL } from "../../lib/url";
import { FILTER_FILMS, FILTER_GENRE, GET_ALL_FILMS, ONCHANGE_FILM, ONSAVE_FILM, SET_FAIL, SET_LOADING } from "./type";

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

export const onChangeFilm = (value, index, el) => (dispatch) => {
	dispatch({
		type: ONCHANGE_FILM,
		payload: {
			value,
			index,
			el
		}
	});
};

export const updateFilm = (element, index, intialFilm) => {
	const action = {
		type: ONSAVE_FILM
	};

	const findId = intialFilm.findIndex((el) => el.title === element.title || el.view === element.view || el.description === element.description || el.genre === element.genre );

	return callApi(action, element, findId - 1);
};

const callApi = (action, type = undefined, index = undefined) => async (dispatch) => {
	try {
		dispatch({
			type: SET_LOADING
		});

		if (action.type === ONSAVE_FILM) {
			const data = {
				title: type.title,
				views: type.view,
				genre: type.genre,
				descriptions: type.description
			};

			const response = await fetch(SAVE_FILM_URL(index), {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				method: "PUT",
				body: JSON.stringify(data),
			});

			dispatch({
				type: action.type
			});
			return;
		}

		setTimeout( async () => {
			const response = await fetch(GET_ALL_FILMS_URL);
			const result = await response.json();

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