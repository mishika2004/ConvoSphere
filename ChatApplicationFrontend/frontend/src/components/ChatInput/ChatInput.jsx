import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import "./ChatInput.css";

function ChatInput({ socket, selectedUser, setRefreshMessages }) {

    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const currentUser = localStorage.getItem("username");

    // Timer for typing indicator
    let typingTimer;

    function handleEmojiClick(emojiData) {
        setMessage((prev) => prev + emojiData.emoji);
    }

    const sendMessage = () => {

        if (message.trim() === "") return;

        socket.emit("send_message", {
            sender: currentUser,
            receiver: selectedUser.username,
            message: message
        });

        // Tell the server the user stopped typing
        socket.emit("stop_typing");

        setMessage("");
        setShowEmojiPicker(false);

        setTimeout(() => {
            setRefreshMessages((prev) => prev + 1);
        }, 100);
    };

    return (

        <div className="chat-input-container">

            <div className="emoji-container">

                <button
                    className="emoji-btn"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <BsEmojiSmile />
                </button>

                {
                    showEmojiPicker && (

                        <div className="emoji-picker">

                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                width={300}
                                height={350}
                            />

                        </div>

                    )
                }

            </div>

            <input
                type="text"
                placeholder="Type a message..."
                value={message}

                onChange={(e) => {

                    setMessage(e.target.value);

                    // Tell backend the user is typing
                    socket.emit("typing", {
                        sender: currentUser
                    });

                    // Reset timer
                    clearTimeout(typingTimer);

                    // If user stops typing for 1 second
                    typingTimer = setTimeout(() => {

                        socket.emit("stop_typing");

                    }, 1000);

                }}

                onKeyDown={(e) => {

                    if (e.key === "Enter") {
                        sendMessage();
                    }

                }}
            />

            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
            >
                <IoSend />
            </motion.button>

        </div>

    );

}

export default ChatInput;