import React, { useRef } from "react";
import PropTypes from "prop-types";
import MyButton from "../atoms/button";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/modal/action";
import { filterFilms, onChangeFilm, updateFilm } from "../../store/films/action";

export default function MyTable({ data, state }) {
	return (
		<div className="overflow-auto w-full">
			<table className="w-full" style={{ minWidth: 750 }}>
				<CreateTitle data={data[0]} />
				<CreateBody data={data} isFilter={state} />
			</table>
		</div>
	);
}

function CreateTitle({ data }) {
	const key = Object.keys(data);
	const col = `lg:grid-cols-${key.length + 3}`;

	return (
		<thead className="w-full text-center">
			<tr className={`lg:grid ${col} w-full bg-gray-400`}>
				{key.map((el, i) => <th className={`${i === 0 ? "border-l-4" : ""} ${i === key.length - 2 || i === key.length-3 || i === 1 ? "col-span-2" : ""}  py-4 border-t-4 border-r-4 border-black border-opacity-100`} key={el}>{el}</th>)}
			</tr>
		</thead>
	);
}

function CreateBody({ data, isFilter }) {
	const dispatch = useDispatch();
	const key = Object.keys(data[0]);
	const col = `lg:grid-cols-${key.length + 3}`;
	const [ editing, setEditing ] = React.useState([]);

	React.useEffect(() => {
		const editing = [];
		data.forEach(el => {
			editing.push(true);
		});
		setEditing(editing);
	}, [ ]);

	const handleClose = () => dispatch(closeModal());

	const handleModal = (content) => () => {
		const child = (
			<div className="flex flex-col p-10 space-y-6">
				<p>{content}</p>
				<div className="flex flex-row">
					<div className="flex-1"></div>
					<button className="" onClick={handleClose}>closed</button>
				</div>
			</div>
		);
		dispatch(openModal(child));
	};

	const handleEdit = (id) => () => {
		if (!editing[id]) {
			dispatch(updateFilm(data[id], id-1));
		}
		setEditing((prev) => [ ...prev, prev[id] = !prev[id] ]);
	};

	const handleFilter = (type) => (e) => {
		dispatch(filterFilms(e.target.value, type));
	};

	const descRow = (val, i, id, el) => {
		return (
			<td key={val + i} className={`${i === 0 ? "border-l-4" : ""} ${id === data.length - 1 ? "border-b-4" : ""}  ${i === key.length - 2 || i === key.length - 3  || i === 1 ? "col-span-2" : ""} flex flex-row max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 py-2 px-4`}>
				<CreateValue value={val} disabled={editing[id]} id={id} el={el} isFilter={isFilter}/>
				<MyButton handleClick={handleModal(val)} type="iconTable" text={<i className="ri-information-fill text-xl"></i>}/>
			</td>
		);
	};

	const normalRow = (val, i, id, el) => {
		return (
			<td key={val + i} className={`${i === 0 ? "border-l-4" : ""} ${id === data.length - 1 ? "border-b-4" : ""} ${i === key.length - 2 || i === key.length - 3 || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 py-2`}>
				{
					id === 0 && (i === 1 || i === 3)
						? <input className="border-2 border-black" onChange={handleFilter(i === 1 ? "film" : "genre")}/>
						: <CreateValue value={val} disabled={editing[id]} id={id} el={el} isFilter={isFilter}/>
				}
			</td>
		);
	};

	const actionRow = (val, i, id, el) => {
		return (
			<td td key={val} className={`${i === 0 ? "border-l-2" : ""} ${id === data.length - 1 ? "border-b-2" : ""} ${i === key.length - 2 || i === key.length - 3  || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 px-4 py-2`}>
				<CreateOption state={editing[id]} handleEdit={handleEdit} id={id}/>
			</td>
		);
	};

	return (
		<tbody className="w-full text-center">
			{data.map((el, id) => (
				<tr key={id} className={`${isFilter ? id % 2 === 0 ? "bg-gray-100" : "" : id % 2 !== 0 ? "bg-gray-100" : ""} ${id === 0 ? isFilter ? "lg:grid w-full " + col : "hidden" : "lg:grid w-full " + col}`}>
					{Object.values(el).map((val, i) => (
						isFilter
							?
							(i === key.length - 1 && id !== 0)
								?
								actionRow(val, i, id)
								:
								(i === 4 && id !== 0)
									?
									descRow(val, i, id, key[i])
									:
									normalRow(val, i, id, key[i])
							:
							(i === key.length - 1 && id !== 0)
								?
								actionRow(val, i, id)
								:
								(i === 4 && id !== 0)
									?
									descRow(val, i, id, key[i])
									:
									normalRow(val, i, id, key[i])
					))}
				</tr>
			))}
		</tbody>
	);
}

function CreateValue({ value, disabled, id, el, isFilter }) {
	const dispatch = useDispatch();
	const inputRef = useRef();

	const handleChange = (id) => (e) => {
		console.log(id, el, e.target.value);
		dispatch(onChangeFilm(e.target.value, id, el));
	};

	React.useEffect(() => {
		if (!disabled) {
			inputRef.current.focus();
		}
	}, [ ]);

	return (
		disabled
			? <p className="flex-1 truncate">{value}</p>
			: <input ref={inputRef} type={el === "view" ? "number" : "text"} className="flex-1" value={value} disabled={disabled} onChange={handleChange(id)}/>
	);
}

function CreateOption({ state, handleEdit, id }) {
	return (
		!state
			? <button className="bg-black px-2 py-1 rounded" onClick={handleEdit(id)}><i className="ri-save-2-line text-white text-sm"></i></button>
			: <button className="bg-black px-2 py-1 rounded" onClick={handleEdit(id)}><i className="ri-pencil-line text-white text-sm"></i></button>
	);
}

MyTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	state: PropTypes.bool
};

CreateTitle.propTypes = {
	data: PropTypes.object
};

CreateBody.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	isFilter: PropTypes.bool
};

CreateOption.propTypes = {
	state: PropTypes.bool,
	handleEdit: PropTypes.func,
	id: PropTypes.number
};

CreateValue.propTypes = {
	value: PropTypes.string,
	disabled: PropTypes.bool,
	id: PropTypes.number,
	el: PropTypes.string,
	isFilter: PropTypes.bool
};