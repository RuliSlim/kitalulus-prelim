import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/atoms/button";
import MyTable from "../components/table/table";
import { getAllFilms } from "../store/films/action";

export default function Home() {
	const { loading, isError, message, films, filterFilms, isFilter } = useSelector(state => state.films );
	const dispatch = useDispatch();
	const [ data, setData ] = React.useState(films);
	const [ filter, setFilter ] = React.useState(false);
	// const [ data, ]

	const manipulateData = () => {
		const newData = [
			{
				no: "",
				title: "",
				view: "",
				genre: "",
				description: "",
				action: ""
			}
		];

		if (isFilter) {
			filterFilms.forEach((el, i) => {
				newData.push({
					no: i + 1,
					title: el.title,
					view: el.views,
					genre: el.genre,
					description: el.descriptions,
					action: ""
				});
			});
		} else {
			console.log(films, "ini films<<<<<<");
			films.forEach((el, i) => {
				newData.push({
					no: i + 1,
					title: el.title,
					view: el.views,
					genre: el.genre,
					description: el.descriptions,
					action: ""
				});
			});
		}
		console.log(newData, "<<<<<<<Fsafsa");
		setData(newData);
	};

	React.useEffect(() => {
		dispatch(getAllFilms());
	}, [ ]);

	React.useEffect(() => {
		manipulateData();
	}, [ films, filterFilms, isFilter ]);

	const handleCLick = () => setFilter(!filter);

	return (
		<div className="flex flex-col space-y-2">
			<div>
				<MyButton text="filter" type="normal" handleClick={handleCLick}/>
			</div>
			{
				loading
					? <div>Loading....</div>
					: <MyTable data={data} state={filter}/>
			}
		</div>
	);
}