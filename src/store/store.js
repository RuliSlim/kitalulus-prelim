import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { filmReducer } from "./films/reducer";

export const RootReducer = combineReducers({
	films: filmReducer
});

export const store = createStore(RootReducer, applyMiddleware(thunk));