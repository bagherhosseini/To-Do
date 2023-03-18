import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import AddUsersFetch from "../components/users/addUserFetch";
import GetUsersFetch from "../components/users/getUsersFetch";
import GetReqFetch from "../components/users/getReqFetch";
import UpdateReqFetch from "../components/users/updateStatusFetch";
import GetFriendsFetch from "../components/users/getFriendsFetch";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [reqs, setReqs] = useState([]);
    const [friends, setFriends] = useState([]);

    const [AddUserMsg, setAddUserMsg] = useState();
    const [AddUserErr, setAddUserErr] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
        getReq();
        getFriends();
    }, []);

    async function getUsers() {
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
            getReq();
            getUsers();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(response.ok){
                setAddUserErr(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getReq() {
        try {
            const response = await GetReqFetch();
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            setReqs(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateReq(reqid) {
        try {
            const response = await UpdateReqFetch(reqid);
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            getReq();
            getFriends();
        } catch (error) {
            console.error(error);
        }
    }

    async function getFriends() {
        try {
            const response = await GetFriendsFetch();
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            setFriends(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddUser(event) {
        const usernameRec = event.target.value;
        addUser(usernameRec);
    }

    function handleAcceptRequest(event){
        const reqid = event.target.value;
        updateReq(reqid);
    }

    return(
        <div className="userSection">
            <div className="link">
                <Link className="linkLogOut" to="/"><i className="fa-solid fa-right-from-bracket"></i></Link>
            </div>

            <div className="users">
                <h1>Users</h1>
                {
                    users.length ? 
                        users.map((item) => (
                            <div className="user" key={item.userid}>
                                <div className="userInfo">
                                    <span>{item.name}</span>
                                    <span>{item.username}</span>
                                </div>
                                <button value={item.username} onClick={handleAddUser}>add</button>
                            </div>
                        ))
                    :
                        <div className="error">
                            <span>There are no users</span>
                        </div>
                }
                
            </div>

            <div className="requestCon">
                <h1>Requests</h1>
                {
                    reqs.length ? 
                        reqs.map((item) => (
                            <div className="requests" key={item.requestid}>
                                <span>{item.requestsender}</span>
                                <button value={item.requestid} onClick={handleAcceptRequest}>✔</button>
                            </div>
                        ))
                        :
                            <div className="error">
                                <span>There are no Requests</span>
                            </div>
                }
            </div>

            <div className="friends">
                <h1>Friends</h1>
                {
                    friends.length ? 
                        friends.map((item) => (
                            <div className="friend" key={item.userid}>
                                <Link className="friendUsername" to={`/Todo/Friend/${item.username}`}>{item.username}</Link>
                            </div>
                        ))
                        :
                        <div className="error">
                            <span>There are no Friends</span>
                        </div>
                }
            </div>
        </div>
    )
}