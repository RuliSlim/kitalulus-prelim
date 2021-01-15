import React from "react";
import { useSelector } from "react-redux";
import Modal from "./components/modal/modal";
import Home from "./pages/home";

function App() {
	const { isOpen, children } = useSelector(state => state.modal);
	return (
		<div className="h-screen w-screen container m-auto py-10">
			<div className="">
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
