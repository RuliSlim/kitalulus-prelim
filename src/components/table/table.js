import React from "react";
import PropTypes from "prop-types";
import MyButton from "../atoms/button";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/modal/action";
import { filterFilms } from "../../store/films/action";

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

	const handleFilter = (type) => (e) => {
		console.log(e.target.value, "<<<<");
		dispatch(filterFilms(e.target.value, type));
	};

	const descRow = (val, i, id) => {
		return (
			<td key={val + i} className={`${i === 0 ? "border-l-4" : ""} ${id === data.length - 1 ? "border-b-4" : ""}  ${i === key.length - 2 || i === key.length - 3  || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 py-2`}>
				<div className="float-right">
					<MyButton handleClick={handleModal(val)} type="iconTable" text={<i className="ri-information-fill text-xl"></i>}/>
				</div>
				<p className="truncate p-2">{val}</p>
			</td>
		);
	};

	const normalRow = (val, i, id) => {
		return (
			<td key={val + i} className={`${i === 0 ? "border-l-4" : ""} ${id === data.length - 1 ? "border-b-4" : ""} ${i === key.length - 2 || i === key.length - 3 || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 py-2`}>
				<p>{val}</p>
			</td>
		);
	};

	const actionRow = (val, i, id) => {
		return (
			<td td key={val} className={`${i === 0 ? "border-l-2" : ""} ${id === data.length - 1 ? "border-b-2" : ""} ${i === key.length - 2 || i === key.length - 3  || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 px-4 py-2`}>
				<CreateOption state={false} />
			</td>
		);
	};

	const filterRow = (val, i, id) => {
		return (
			<td key={val} className={`${i === 0 ? "border-l-4" : ""} ${id === data.length - 1 ? "border-b-4" : ""}  ${i === key.length - 2 || i === key.length - 3 || i === 1 ? "col-span-2" : ""} max-w-md max-h-xs truncate  border-r-4 border-black border-opacity-100 py-2`}>
				{
					id === 0 && (i === 1 || i === 3)
						? <input className="border-2 border-black" onChange={handleFilter(i === 1 ? "film" : "genre")}/>
						: <p>{val}</p>
				}
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
									descRow(val, i, id)
									:
									filterRow(val, i, id)
							:
							(i === key.length - 1)
								?
								actionRow(val, i, id)
								:
								(i === 4)
									?
									descRow(val, i, id)
									:
									normalRow(val, i, id)
					))}
				</tr>
			))}
		</tbody>
	);
}

function CreateOption({ state }) {
	return (
		state
			? <> save </>
			: <MyButton text={<i className="ri-pencil-line text-white text-sm"></i>} type="icon" />
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
	state: PropTypes.bool
};