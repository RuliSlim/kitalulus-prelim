import { CLOSE_MODAL, OPEN_MODAL } from "./type";

export const openModal = (children) => (dispatch) => {
	dispatch({
		type: OPEN_MODAL,
		payload: children
	});
};

export const closeModal = () => (dispatch) => {
	dispatch({
		type: CLOSE_MODAL
	});
};