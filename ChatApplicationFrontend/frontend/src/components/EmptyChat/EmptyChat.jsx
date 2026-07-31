import { FaComments } from "react-icons/fa";
import "./EmptyChat.css";

function EmptyChat(){

    return(

        <div className="empty-chat">

            <FaComments className="empty-icon"/>

            <h2>

                Welcome to ConvoSphere

            </h2>

            <p>

                Select a user from the sidebar to start chatting.

            </p>

        </div>

    )

}

export default EmptyChat;