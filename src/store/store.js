import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { filmReducer } from "./films/reducer";
import { modalReducer } from "./modal/reducer";

export const RootReducer = combineReducers({
	films: filmReducer,
	modal: modalReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));