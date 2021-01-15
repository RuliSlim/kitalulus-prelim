import React from "react";
import Home from "./pages/home";

function App() {
	return (
		<div className="relative h-screen">
			<div className="absolute top-1/2 left-1/3 transform -translate-x-1/3	-translate-y-1/2">
				<Home />
			</div>
		</div>
	);
}

export default App;
