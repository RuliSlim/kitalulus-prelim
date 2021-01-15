import React from "react";
import { Provider } from "react-redux";
import Home from "./pages/home";
import { store } from "./store/store";

function App() {
	return (
		<Provider store={store}>
			<div className="relative h-screen">
				<div className="absolute top-1/2 left-1/3 transform -translate-x-1/3	-translate-y-1/2">
					<Home />
				</div>
			</div>
		</Provider>
	);
}

export default App;
