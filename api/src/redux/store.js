import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {NEW_MESSAGE} from "./actionConstants";

const INITIAL_STATE = {
    messages: []
}

const rootReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            return { messages: action.payload.messages };
        default:
            return state;
     }
}
export default createStore(rootReducer, applyMiddleware(thunkMiddleware));