import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import '../styles/style.scss';

import GetTodo from '../components/todo/getTodo';
import DeleteTodo from "../components/todo/deletData";
import EditTodo from "../components/todo/editTodo";
import addTodoFetch from "../components/todo/addTodoFetch";


export default function Home() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    const [editErr, setEditErr] = useState(false);
    const [editErrMsg, setEditErrMsg] = useState();

    const [addErr, setAddErr] = useState(false);
    const [addMsg, setAddMsg] = useState();

    const navigate = useNavigate();


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
            console.error(error);
            
        }
    }

    async function addTodoFetchHome(title) {
        try {
            const response = await addTodoFetch(title);
            const data = await response.json();
            setAddMsg(data);
            setAddErr(false);
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(response.ok){
                setAddErr(true);
            }
            
            setTitle('');
            getTodos();
            return;
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    }

    async function editTodo(newValue, id) {
        try {
            const response = await EditTodo(newValue, id);
            const data = await response.json();
            setEditErrMsg(data);
            setEditErr(false)
            if(data === "Authentication error: jwt expired"){
                navigate("/");
            }
            if(response.ok){
                setEditErr(true);
            }
            getTodos();
        } catch (error) {
            console.error(error);
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
        <div className="todos">
            <div className="link">
                <Link className="linkToFriend" to="/Users"><i className="fa-solid fa-user"></i></Link>
                <Link className="linkLogOut" to="/"><i className="fa-solid fa-right-from-bracket"></i></Link>
            </div>

            <h1>Get things done!</h1>

            <form className="addTodo" onSubmit={handleSubmit}>
                <div className="formCon">
                    <label className="titleLabel" htmlFor="title">
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Min 3 charaters long"/>
                    </label>
                    <button type="submit"><span>+</span></button>
                </div>

                <div className={addErr ? "success" : "error"} style={{display: addMsg ? "block" : "none"}}>
                    <p>{addMsg}</p>
                </div>
            </form>

            <div className="todoList"> 
            {
                todos.length ? 
                    todos.map((item) => (
                        <div className="todo" key={item.todoid}>
                            <input name="title" className="todoInput" defaultValue={item.title} type="text" onChange={(event) => onChangeInput(event, item.todoid)} placeholder="Min 3 charaters long"/>
                            <input type="checkbox" id="todoCheckbox" value={item.todoid} onChange={handleCheckboxChange}/>
                            <label className="todoLable" htmlFor="todoCheckbox"></label>
                        </div>
                    ))
                    :
                        <div className="noDataError">
                            <span>You have any todos</span>
                        </div>
                }

                <div className={editErr ? "success" : "error"} style={{display: editErrMsg ? "block" : "none"}}>
                    <p>{editErrMsg}</p>
                </div>
            </div>
        </div>
    );
}