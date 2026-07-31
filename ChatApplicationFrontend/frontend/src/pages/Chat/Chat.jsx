import { useState, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

import Sidebar from "../../components/Sidebar/Sidebar";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import EmptyChat from "../../components/EmptyChat/EmptyChat";
import Messages from "../../components/Messages/Messages";
import ChatInput from "../../components/ChatInput/ChatInput";
import "./Chat.css";

function Chat() {

    const [refreshMessages, setRefreshMessages] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const socket = useMemo(() => io("http://localhost:5000"), []);

    useEffect(() => {
        socket.on("user_typing", () => {
            setIsTyping(true);
        });

        socket.on("user_stopped_typing", () => {
            setIsTyping(false);
        });

        return () => {

        socket.off("user_typing");

        socket.off("user_stopped_typing");

    };

    }, [socket]);
    return (

        <div className="chat-page">

            <Sidebar
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />

            <div className="chat-section">

                <ChatHeader
                    selectedUser={selectedUser}
                    isTyping={isTyping}
                />

                {
                    selectedUser ?

                    <>
                        <Messages
                            selectedUser={selectedUser}
                            refreshMessages={refreshMessages}
                            socket={socket}
                        />

                        <ChatInput
                            socket={socket}
                            selectedUser={selectedUser}
                            setRefreshMessages={setRefreshMessages}
                        />
                    </>

                    :

                    <EmptyChat />
                }

            </div>

        </div>

    );

}

export default Chat;