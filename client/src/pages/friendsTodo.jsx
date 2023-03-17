import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import GetFriendTodoFetch from "../components/friendsList/getFriendTodoFetch";

export default function FriendsTodo(){
    let { Friendusername } = useParams();
    const navigate = useNavigate();

    const [friendTodos, setFriendTodo] = useState([]);

    useEffect(() => {
        getFriendTodo(Friendusername);
    }, []);

    async function getFriendTodo(Friendusername) {
        try {
            const response = await GetFriendTodoFetch(Friendusername);
            const data = await response.json();
            setFriendTodo(data);
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            {friendTodos.map((item) => (
                <div className="todo" key={item.todoid}>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    )
}