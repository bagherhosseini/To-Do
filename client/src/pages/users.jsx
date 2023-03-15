import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import UsersFetch from "../components/users/getUsers";

export default function Users(){
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        usersFetch();
    }, []);

    async function usersFetch() {
        try {
            const response = await UsersFetch();
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="users">
            {users.map((item) => (
                <div className="user" key={item.todoid}>
                    <span>{item.name}</span>
                    <span>{item.username}</span>
                    <button>add</button>
                </div>
            ))}
        </div>
    )
}