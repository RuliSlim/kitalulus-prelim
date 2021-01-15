import React from "react";
import PropTypes from "prop-types";

export default function MyButton({ text, type, handleClick }) {
	const [ name, setName ] = React.useState("");
	const [ child, setChild ] = React.useState("");

	React.useEffect(() => {
		let newName = "";
		let newChild = "";

		if (type === "normal") {
			newName = "relative px-2 py-1 bg-white border-2 border-black";
			newChild = "absolute left-1 top-1 bg-current w-full h-full";
		}

		if (type === "icon") {
			newName = "bg-black px-2 py-1 rounded";
		}

		setName(newName);
		setChild(newChild);
	}, []);

	return (
		<button className={name} onClick={handleClick}>
			{text}
			<div className={child} style={{ zIndex: -1 }}></div>
		</button>
	);
}

MyButton.propTypes = {
	text: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
	type: PropTypes.string,
	handleClick: PropTypes.func
};