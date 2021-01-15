import React from "react";
import MyTable from "../components/table/table";

const dummyData = [
	{
		"descriptions": "lorem ipsum dolor si amet spanish germany france",
		"genre": "drama, comedy",
		"title": "junky food",
		"views": "250"
	},
	{
		"descriptions": "ini deskripsi yg sangattttt panjangggggggg banget. lorem ipsum dolor",
		"genre": "actions, drama",
		"title": "Attack on Titan",
		"views": "2500"
	},
	{
		"descriptions": "Haikyu!! is a Japanese shōnen manga series written and illustrated by Haruichi Furudate. Individual chapters have been serialized in Weekly Shōnen Jump since February 2012, with bound volumes published by Shueisha",
		"genre": "Comedy, sport",
		"title": "Haikyu!!",
		"views": "1234"
	}
];
export default function Home() {
	const [ data, setData ] = React.useState(dummyData);
	React.useEffect(() => {
		const newData = [];
		data.forEach((el, i) => {
			newData.push({
				no: i,
				title: el.title,
				view: el.views,
				genre: el.genre,
				description: el.descriptions,
				action: 0
			});
		});
		setData(newData);
	}, []);
	return (
		<MyTable data={data} />
	);
}