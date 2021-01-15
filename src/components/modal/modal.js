import React from "react";
import PropTypes from "prop-types";
import { closeModal } from "../../store/modal/action";
import { useDispatch } from "react-redux";

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const handleClose = () => dispatch(closeModal());

	return (
		<>
			<div className="">
				<div className="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2	-translate-y-1/2 bg-white border-4 border-black">
					<div className="z-50 bg-white bg-opacity-100 relative -top-1 left-4 w-4 h-1"></div>
					{children}
				</div>
			</div>
			<div className="z-10 fixed left-0 top-0 bg-black w-screen h-screen bg-opacity-25" onClick={handleClose}>
			</div>
		</>
	);
}

Modal.propTypes = {
	handleClose: PropTypes.func,
	children: PropTypes.node
};