import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/atoms/button";
import MyTable from "../components/table/table";
import { getAllFilms } from "../store/films/action";

export default function Home() {
	const { loading, isError, message, films } = useSelector(state => state.films );
	const dispatch = useDispatch();
	const [ data, setData ] = React.useState(films);
	const [ isFilter, setIsFilter ] = React.useState(false);
	// const [ data, ]

	const manipulateData = () => {
		const newData = [];

		films.forEach((el, i) => {
			newData.push({
				no: i === 0 ? "" : i,
				title: el.title,
				view: el.views,
				genre: el.genre,
				description: el.descriptions,
				action: ""
			});
		});
		setData(newData);
	};

	React.useEffect(() => {
		dispatch(getAllFilms());
	}, [ ]);

	React.useEffect(() => {
		manipulateData();
	}, [ films ]);

	const handleCLick = () => setIsFilter(!isFilter);

	return (
		<div className="flex flex-col space-y-2">
			<div>
				<MyButton text="filter" type="normal" handleClick={handleCLick}/>
			</div>
			{
				loading
					? <div>Loading....</div>
					: <MyTable data={data} state={isFilter}/>
			}
		</div>
	);
}