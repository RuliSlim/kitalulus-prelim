import React from "react";
import PropTypes from "prop-types";

export default function Modal({ handleClose, children }) {

	return (
		<>
			<div className="relative">
				<div className="z-50 absolute top-1/2 left-1/3 transform -translate-x-1/3	-translate-y-1/2 bg-white rounded-2xl">
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