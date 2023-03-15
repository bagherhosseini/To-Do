import { useState, useEffect } from "react";
import '../styles/style.scss';
import ChackCookie from '../components/chackCookie';
// import AddTodo from "../components/addTodo";
import GetTodo from '../components/getTodo';
import DeleteTodo from "../components/deletData";
import EditTodo from "../components/editTodo";
import { useNavigate } from "react-router-dom";

import addTodoFetch from "../components/addTodoFetch";


export default function Home() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [editErr, setEditErr] = useState(false);
    const [editErrMsg, setEditErrMsg] = useState();
    const [addErr, setAddErr] = useState(false);
    const [addErrMsg, setAddErrMsg] = useState();
    const navigate = useNavigate();

    ChackCookie();

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        try {
            const response = await GetTodo();
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            setTodos(data);
        } catch (error) {
            console.error('error' + error);
            
        }
    }

    async function addTodoFetchHome(title) {
        try {
            const response = await addTodoFetch(title);
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(!response.ok){
                setAddErr(true);
                setAddErrMsg(data);
            }
            setAddErr(false);
            setTitle('');
            getTodos();
            return;
        } catch (error) {
            console.error('error1' + error);
            setError(true);
        }
    }

    async function deleteTodo(id) {
        try {
            const response = await DeleteTodo(id);
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            getTodos();
        } catch (error) {
            console.error('error2' + error);
        }
    }

    async function editTodo(newValue, id) {
        try {
            const response = await EditTodo(newValue, id);
            const data = await response.json();
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(!response.ok){
                setEditErr(true);
                setEditErrMsg(data);
            }
            setEditErr(false);
            getTodos();
        } catch (error) {
            console.error('error3' + error);
        }
    }

    function handleCheckboxChange(event) {
        const id = event.target.value;
        deleteTodo(id);
    }

    function onChangeInput(event, id) {
        const newValue = event.target.value;
        editTodo(newValue, id);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addTodoFetchHome(title);
    }

    return (
        <div>
            <div className="addTodo">
                <form className="todoForm" onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        <span>Title:</span>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {
                            addErr?
                                <div>
                                    <p>{addErrMsg}</p>
                                </div>
                            :
                            <div>
                                {/* <p>{editErr[0]}</p> */}
                            </div>
                        }
                    </label>
                    <button type="submit">Add</button>
                    {!error ? (
                        <div className="error">
                            {/* <p>{message}</p> */}
                        </div>
                    ) : (
                        <></>
                    )}
                </form>
            </div>

            <div className="todoList">
            {todos.map((item) => (
                <label key={item.todoid} htmlFor="todoCheckbox">
                    <input name="title" defaultValue={item.title} type="text" onChange={(event) => onChangeInput(event, item.todoid)} placeholder="Type title"/>
                    <input type="checkbox" id={`todoCheckbox-${item.todoid}`} value={item.todoid}onChange={handleCheckboxChange}/>
                    {
                        editErr?
                            <div>
                                <p>{editErrMsg}</p>
                            </div>
                        :
                        <div>
                            <p></p>
                        </div>
                    }
                </label>
            ))}

            </div>
        </div>
    );
}