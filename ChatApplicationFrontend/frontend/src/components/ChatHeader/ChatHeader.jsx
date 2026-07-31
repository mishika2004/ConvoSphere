import "./ChatHeader.css";

function ChatHeader({ selectedUser, isTyping }) {

    return (

        <div className="chat-header">

            {

                selectedUser ?

                    <div>

                        <h3>{selectedUser.username}</h3>
                        {
                            isTyping ? 
                            <small className="typing"> Typing.... </small>
                        
                        :
                        <small>Online</small>
                        }
                    </div>

                    :

                    <div>

                        <h3>Welcome to ConvoSphere</h3>

                        <span>Select a user to start chatting</span>

                    </div>

            }

        </div>

    );

}

export default ChatHeader;