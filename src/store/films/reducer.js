import { FILTER_FILMS, FILTER_GENRE, GET_ALL_FILMS, ONCHANGE_FILM, ONSAVE_FILM, SET_FAIL, SET_LOADING } from "./type";

const initialFilm = {
	no: "",
	title: "",
	view: "",
	genre: "",
	description: "",
	action: ""
};

const initialState = {
	films: [ initialFilm ],
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
	case GET_ALL_FILMS: {
		const film = structFilms(action.payload);
		return { ...state, loading: false, films: film };
	}
	case SET_FAIL:
		return { ...state, loading: false, isError: true, message: action.payload };
	case FILTER_FILMS: {
		const filter = state.films.filter((el) => el.title.toLowerCase().includes(action.payload.toLowerCase()));
		if (action.payload) {
			return { ...state, isFilter: true, filterFilms: structFilms(filter, "filter") };
		}
		return { ...state, isFilter: false };
	}
	case FILTER_GENRE: {
		const filter = state.films.filter((el) => el.genre.toLowerCase().includes(action.payload.toLowerCase()));
		return { ...state, isFilter: true, filterFilms: structFilms(filter, "filter") };
	}
	case ONCHANGE_FILM: {
		const initialFilm = state.films;
		const newFilms = state.isFilter ? state.filterFilms : state.films;

		const editingFilms = newFilms[action.payload.index];
		newFilms[action.payload.index] = {
			...newFilms[action.payload.index],
			[action.payload.el]: action.payload.value
		};

		const findId = state.films.findIndex((el) => el.title === editingFilms.title || el.view === editingFilms.view || el.description === editingFilms.description || el.genre === editingFilms.genre );
		initialFilm[findId] = {
			...initialFilm[findId],
			[action.payload.el]: action.payload.value
		};

		if (state.isFilter) return { ...state, filterFilms: [ ...newFilms ], films: [ ...initialFilm ] };
		return { ...state, films: [ ...newFilms ] };
	}
	case ONSAVE_FILM:
		return { ...state, loading: false };
	}

	return state;
};

function structFilms (films, type) {
	const newData = [
		{
			no: "",
			title: "",
			view: "",
			genre: "",
			description: "",
			action: ""
		}
	];

	if (type === "filter") {
		films.forEach((el, i) => {
			newData.push({
				no: i + 1,
				title: el.title,
				view: el.view,
				genre: el.genre,
				description: el.description,
				action: ""
			});
		});
	} else {
		films.forEach((el, i) => {
			newData.push({
				no: i + 1,
				title: el.title,
				view: el.views,
				genre: el.genre,
				description: el.descriptions,
				action: ""
			});
		});
	}

	return newData;
}