import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../components/atoms/button";
import MyTable from "../components/table/table";
import { getAllFilms } from "../store/films/action";

export default function Home() {
	const { loading, isError, message, films, filterFilms, isFilter } = useSelector(state => state.films );
	const dispatch = useDispatch();
	const [ filter, setFilter ] = React.useState(false);

	React.useEffect(() => {
		dispatch(getAllFilms());
	}, [ ]);

	const handleCLick = () => setFilter(!filter);

	return (
		<div className="flex flex-col space-y-2">
			<div>
				<MyButton text="filter" type="normal" handleClick={handleCLick}/>
			</div>
			{
				loading
					? <div>Loading....</div>
					: <MyTable data={isFilter ? filterFilms : films} state={filter}/>
			}
		</div>
	);
}