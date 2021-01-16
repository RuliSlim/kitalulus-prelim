import React, { useRef } from "react";
import PropTypes from "prop-types";
import MyButton from "../atoms/button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/modal/action";
import { filterFilms, onChangeFilm, updateFilm } from "../../store/films/action";

export default function MyTable({ data, state }) {

	return (
		<div className="overflow-auto w-full">
			<table className="w-full" style={{ minWidth: 750 }}>
				<CreateTitle data={data[0]} />
				<tbody className="w-full">
					{
						data.map((el, id) => <CreateBodySimple key={el.title + id} data={el} isFilter={state} id={id} length={data.length - 1}/>)
					}
				</tbody>
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

function CreateBodySimple({ data, isFilter, id, length }) {
	const dispatch = useDispatch();
	const { films } = useSelector(state => state.films);
	const [ editing, setEditing ] = React.useState(false);

	const handleEdit = (id) => () => {
		if (editing) {
			// console.log(data, id, "<<<<<");
			dispatch(updateFilm(data, id-1, films));
		}
		setEditing(!editing);
	};

	const handleFilter = (type) => (e) => {
		dispatch(filterFilms(e.target.value, type));
	};

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

	const handleChange = (id, el) => (e) => {
		dispatch(onChangeFilm(e.target.value, id, el));
	};

	return (
		<React.Fragment>
			<tr className={`grid-cols-9 text-center ${id === 0 ? isFilter ? "grid" : "hidden" : "grid"}`}>
				<td className={`${id === length ? "border-b-4" : ""} border-l-4 border-opacity-100 border-black max-w-md max-h-xs truncate border-r-4`}>{data.no}</td>
				<td className={`${id === length ? "border-b-4" : ""} border-r-4 border-opacity-100 border-black max-w-md max-h-xs truncate col-span-2`}>
					{id === 0
						? <input className="border-2 border-black" onChange={handleFilter("film")}/>
						:
						editing
							? <input type="text" className="flex-1 border-2 border-black w-full" value={data.title} onChange={handleChange(id, "title")}/>
							: <p className="flex-1 truncate">{data.title}</p>

					}
				</td>
				<td className={`${id === length ? "border-b-4" : ""} border-r-4 border-opacity-100 border-black max-w-md max-h-xs truncate border-r-4`}>
					{
						editing
							? <input type="number" className="flex-1 border-2 border-black w-full" value={data.view} onChange={handleChange(id, "view")}/>
							: <p className="flex-1 truncate">{data.view}</p>
					}
				</td>
				<td className={`${id === length ? "border-b-4" : ""} border-r-4 border-opacity-100 border-black max-w-md max-h-xs truncate col-span-2`}>
					{id === 0
						? <input className="border-2 border-black" onChange={handleFilter("genre")}/>
						:
						editing
							? <input type="text" className="flex-1 border-2 border-black w-full" value={data.genre} onChange={handleChange(id, "genre")}/>
							: <p className="flex-1 truncate">{data.genre}</p>

					}
				</td>
				<td className={`${id === length ? "border-b-4" : ""} border-r-4 border-opacity-100 border-black max-w-md max-h-xs truncate col-span-2`}>
					<div className="float-right">
						<MyButton handleClick={handleModal(data.description)} type="iconTable" text={<i className="ri-information-fill text-xl"></i>}/>
					</div>
					{
						editing
							? <input type="text" className="flex-1 border-2 border-black w-full" value={data.description} onChange={handleChange(id, "description")}/>
							: <p className="flex-1 truncate">{data.description}</p>
					}
				</td>
				<td className={`${id === length ? "border-b-4" : ""} border-r-4 border-opacity-100 border-black max-w-md max-h-xs truncate border-r-4`}>
					{ id !== 0 && <CreateOption state={editing} handleEdit={handleEdit} id={id} />}
				</td>
			</tr>
		</React.Fragment>
	);
}

function CreateOption({ state, handleEdit, id }) {
	return (
		state
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

CreateBodySimple.propTypes = {
	data: PropTypes.object,
	isFilter: PropTypes.bool,
	id: PropTypes.number,
	length: PropTypes.number
};

CreateOption.propTypes = {
	state: PropTypes.bool,
	handleEdit: PropTypes.func,
	id: PropTypes.number
};
