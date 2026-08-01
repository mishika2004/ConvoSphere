import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./Messages.css";

function Messages({ selectedUser, refreshMessages, socket }) {

    const [messages, setMessages] = useState([]);

    const currentUser = localStorage.getItem("username");

    useEffect(() => {

        if (selectedUser) {
            getMessages();
        }

    }, [selectedUser, refreshMessages]);

    // useEffect(() => {

    //     if (!selectedUser) return;

    //     socket.on("receive_message", () => {
    //         getMessages();
    //     });

    //     return () => {
    //         socket.off("receive_message");
    //     };

    // }, [socket, selectedUser]);


    useEffect(() => {

    if (!selectedUser) return;

    socket.on("receive_message", (data) => {

        console.log("Socket event received:", data);

        if (
            (data.sender === selectedUser.username &&
             data.receiver === currentUser) ||

            (data.sender === currentUser &&
             data.receiver === selectedUser.username)
        ) {
            getMessages();
        }

    });

    return () => {

        socket.off("receive_message");

    };

}, [socket, selectedUser]);

    async function getMessages() {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages`,
                {
                    params: {
                        sender: currentUser,
                        receiver: selectedUser.username,
                    },
                }
            );

            console.log("Current User:", currentUser);
            console.log("Selected User:", selectedUser.username);
            console.log("Messages:", response.data);

            setMessages(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="messages">

            {

                messages.map((message) => {

                    console.log(
                        "Current User:", currentUser,
                        "| Sender:", message.sender,
                        "| Receiver:", message.receiver
                    );

                    return (

                        <div
                            key={message._id}
                            className={
                                message.sender === currentUser
                                    ? "my-message"
                                    : "other-message"
                            }
                        >

                            <p>{message.message}</p>

                            <span>
                                {dayjs(message.createdAt).format("hh:mm A")}
                            </span>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default Messages;