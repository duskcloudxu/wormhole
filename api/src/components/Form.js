import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {} from "../redux/actions";

const Form = () => {
    const sendMessage = () => {
        console.log("Sent: ");
    }

    return (
        <div class="card border-primary mb-3">
            <div class="form-group">
                <label for="chatInputForm">Enter message:</label>
                <textarea class="form-control" id="chatInputFormText" rows="1"></textarea>
                <button onClick={sendMessage} type="submit" class="btn btn-primary">Send</button>
            </div>
        </div>
    )
}



export default Form;