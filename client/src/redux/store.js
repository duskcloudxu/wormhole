import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {HOST_CONVERSATION,JOIN_CONVERSATION} from "./actionConstants";
import { initializeSocket } from '../client'

const INITIAL_STATE = {
    currentMembers:[],
    nickName:undefined,
    pubKey:undefined,
    primaryKey:undefined,
    messages: {
        public:[]
    },
    socket:undefined,
}


const rootReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case HOST_CONVERSATION:{
            let socket = initializeSocket();
            state.socket = socket;
            // TODO: RSA experiment.
            return state;
        }

        default:
            return state;
     }
}
export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
