import { CLOSE_MODAL, OPEN_MODAL } from "./type";

const initialState = {
	isOpen: false,
	children: ""
};
export const modalReducer = (state = initialState, action) => {
	switch (action.type) {
	case OPEN_MODAL:
		return { ...state, isOpen: true, children: action.payload };
	case CLOSE_MODAL:
		return { ...state, isOpen: false };
	}
	return state;
};