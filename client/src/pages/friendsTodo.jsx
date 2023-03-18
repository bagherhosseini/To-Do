import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import GetFriendTodoFetch from "../components/friendsList/getFriendTodoFetch";

export default function FriendsTodo(){
    let { Friendusername } = useParams();
    const navigate = useNavigate();

    const [friendTodos, setFriendTodo] = useState([]);
    const [error, setError] = useState(false);
    const [errorMSG, setErrorMSG] = useState(false);

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
            if(!response.ok){
                setError(true);
                setErrorMSG(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <div className="friendsTodo">
            <div className="link">
                <Link className="linkLogOut" to="/"><i className="fa-solid fa-right-from-bracket"></i></Link>
            </div>
            <h1> {Friendusername} Todo List</h1>
            {!setError ? 
            
                    friendTodos.length ? 
                    friendTodos.map((item) => (
                        <div className="todo" key={item.todoid}>
                            <p>{item.title}</p>
                        </div>
                    ))
                    :
                        <div className="error">
                            <span>This user has no todos</span>
                        </div>
            :
                <div className="error">
                    <span>{errorMSG}</span>
                </div>
            }
        </div>
    )
}