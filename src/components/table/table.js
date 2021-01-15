import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";

export default function MyTable({ data }) {
	return (
		<div className="overflow-auto w-full">
			<table className="w-full" style={{ minWidth: 750 }}>
				<CreateTitle data={data[0]} />
				<CreateBody data={data} />
			</table>
		</div>
	);
}

function CreateTitle({ data }) {
	const key = Object.keys(data);
	const col = `lg:grid-cols-${key.length + 2}`;

	return (
		<thead className="w-full text-center">
			<tr className={`lg:grid ${col} w-full`}>
				{key.map((el, i) => <th className={`${i === 0 ? "border-l-2" : ""} ${i === key.length - 1 ? "col-span-2" : ""} border-b-2 py-4 border-t-2 border-r-2 border-black border-opacity-10`} key={el}>{el}</th>)}
			</tr>
		</thead>
	);
}

function CreateBody({ data }) {
	const [ hidden, setHidden ] = React.useState(true);
	const key = Object.keys(data[0]);
	const col = `lg:grid-cols-${key.length + 2}`;

	const handleClose = () => {
		setHidden(false);
	};

	return (
		<tbody className="w-full text-center">
			{data.map((el, i) => (
				<tr key={i} className={`lg:grid ${col} w-full`}>
					{Object.values(el).map((val, i) => (
						(i === key.length - 1)
							? <td td key={val} className={`${i === 0 ? "border-l-2" : ""} col-span-2 border-b-2 border-r-2 border-black border-opacity-10 px-4 py-2`}>
								<CreateOption state={false} />
							</td>
							: <td key={val} className={`${i === 0 ? "border-l-2" : ""}  border-b-2 border-r-2 border-black border-opacity-10 py-2`}>{val}</td>
					))}
				</tr>
			))}
			<div className={`${hidden ? "hidden" : ""}`}>
				<Modal handleClose={handleClose} >
					<div>ini anaken</div>
				</Modal>
			</div>
		</tbody>
	);
}

function CreateOption({ state }) {
	return (
		state
			? <> save </>
			: <> pencil </>
	);
}

MyTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};

CreateTitle.propTypes = {
	data: PropTypes.object
};

CreateBody.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};

CreateOption.propTypes = {
	state: PropTypes.bool
};