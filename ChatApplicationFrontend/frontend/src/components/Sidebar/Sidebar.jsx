import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ selectedUser, setSelectedUser }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        getUsers();

    }, []);

    async function getUsers() {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users?currentUser=` +
                localStorage.getItem("username")
            );

            setUsers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="sidebar">

            <div className="logo">

                ConvoSphere

            </div>

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search User"
                />

            </div>

            <div className="users-list">

                {

                    users.map((user) => (

                        <div

                            key={user._id}

                            className={
                                selectedUser?._id === user._id
                                    ? "user-card active-user"
                                    : "user-card"
                            }

                            onClick={() => setSelectedUser(user)}

                        >

                            <div className="avatar">

                                {user.username.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h5>{user.username}</h5>

                                <span>Tap to Chat</span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Sidebar;