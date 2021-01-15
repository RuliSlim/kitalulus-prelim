import React from "react";
import { useSelector } from "react-redux";
import Modal from "./components/modal/modal";
import Home from "./pages/home";

function App() {
	const { isOpen, children } = useSelector(state => state.modal);
	return (
		<div className="h-screen w-screen">
			<div className="absolute top-1/2 left-1/3 transform -translate-x-1/3	-translate-y-1/2">
				<Home />
			</div>
			<div className={`${isOpen ? "" : "hidden"}`}>
				<Modal>
					{children}
				</Modal>
			</div>
		</div>
	);
}

export default App;
