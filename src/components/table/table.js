import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import MyButton from "../atoms/button";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/modal/action";

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
	const col = `lg:grid-cols-${key.length + 2}`;

	return (
		<thead className="w-full text-center">
			<tr className={`lg:grid ${col} w-full bg-gray-300`}>
				{key.map((el, i) => <th className={`${i === 0 ? "border-l-2" : ""} ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} border-b-2 py-4 border-t-2 border-r-2 border-black border-opacity-10`} key={el}>{el}</th>)}
			</tr>
		</thead>
	);
}

function CreateBody({ data, isFilter }) {
	const dispatch = useDispatch();
	const key = Object.keys(data[0]);
	const col = `lg:grid-cols-${key.length + 2}`;

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

	return (
		<tbody className="w-full text-center">
			{data.map((el, id) => (
				<tr key={id} className={`${isFilter ? id % 2 === 0 ? "bg-gray-100" : "" : id % 2 !== 0 ? "bg-gray-100" : ""} ${id === 0 ? isFilter ? "lg:grid w-full " + col : "hidden" : "lg:grid w-full " + col}`}>
					{Object.values(el).map((val, i) => (
						isFilter
							?
							(i === key.length - 1 && id !== 0)
								?
								<td td key={val} className={`${i === 0 ? "border-l-2" : ""} ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} truncate border-b-2 border-r-2 border-black border-opacity-10 px-4 py-2`}>
									<CreateOption state={false} />
								</td>
								:
								<td key={val} className={`${i === 0 ? "border-l-2" : ""}  ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} truncate border-b-2 border-r-2 border-black border-opacity-10 py-2`}>
									{
										id === 0 && (i === 1 || i === 3)
											? <input />
											: val
									}
								</td>
							:
							(i === key.length - 1)
								?
								<td td key={val} className={`${i === 0 ? "border-l-2" : ""} ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} truncate border-b-2 border-r-2 border-black border-opacity-10 px-4 py-2`}>
									<CreateOption state={false} />
								</td>
								:
								(i === 4)
									?
									<td key={val} className={`${i === 0 ? "border-l-2" : ""}  ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} flex flex-row border-b-2 border-r-2 border-black border-opacity-10 py-2`}>
										<p className="truncate flex-1">{val}</p>
										<MyButton handleClick={handleModal(val)} type="iconTable" text={<i className="ri-information-fill text-xl"></i>}/>
									</td>
									:
									<td key={val} className={`${i === 0 ? "border-l-2" : ""}  ${i === key.length - 2 || i === 1 ? "col-span-2" : ""} truncate border-b-2 border-r-2 border-black border-opacity-10 py-2`}>
										{val}
									</td>
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
			: <MyButton text={<i className="ri-pencil-line text-white text-xl"></i>} type="icon" />
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