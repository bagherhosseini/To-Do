import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import AddUsersFetch from "../components/users/addUserFetch";
import GetUsersFetch from "../components/users/getUsersFetch";

export default function Users(){
    const [users, setUsers] = useState([]);

    const [AddUserMsg, setAddUserMsg] = useState();
    const [AddUserErr, setAddUserErr] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getUsersFetch();
    }, []);

    async function getUsersFetch() {
        try {
            const response = await GetUsersFetch();
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    }

    
    async function addUser(usernameRec) {
        try {
            const response = await AddUsersFetch(usernameRec);
            const data = await response.json();
            setAddUserMsg(data);
            setAddUserErr(false);
            console.log(data);
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(response.ok){
                setAddUserErr(true);
            }
            getUsersFetch();
            return;
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddUser(event) {
        const usernameRec = event.target.value;
        addUser(usernameRec);
    }


    return(
        <div className="users">
            {users.map((item) => (
                <div className="user" key={item.userid}>
                    <span>{item.name}</span>
                    <span>{item.username}</span>
                    <button value={item.username} onClick={handleAddUser}>add</button>
                </div>
            ))}
        </div>
    )
}