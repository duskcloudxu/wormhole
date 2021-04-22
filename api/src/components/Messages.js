import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {} from "../redux/actions";

const Messages = () => {
    const messages = useSelector(state => state.messages);
    const messageIds = Object.keys(messages);
    return (
        <div class="container">
            <div class="card border-dark mb-3">
                <div class="card-body">
                <>
                {
                    messageIds.map(id => (
                        <p key={id}>{messages[id]}</p>
                    ))
                }
                </>
                </div>
            </div>
        </div>
    )
}



export default Messages;