import {NEW_MESSAGE} from "./actionConstants";
import { } from "../client";

// Action creator functions - use async actions to communicate with server



export const newMessage = messages => ({
    type: NEW_MESSAGE,
    payload: {
        messages
    }
})


/**
 * Template calling client.js example
 * 
 * export const actionName = () => {
 *    return dispatch => {
 *      myFunction(result => {
 *          dispatch(...an action that updates the store...)
 *      })
 *    }
 * }
 */