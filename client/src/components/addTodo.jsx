import { useState } from "react";
import addTodoFetch from "./addTodoFetch";
import '../styles/style.scss';

export default function AddTodo(){
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('false');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await addTodoFetch(title);
            const data = await response.json();
            setError(response.ok);
            setMessage(data);
            return;

        }catch (error) {
            setError(false);
            setMessage(error.message)
            return;
        }
        
    };

    return(
        <form className="todoForm" onSubmit={handleSubmit}>
            <label htmlFor="title">
                <span>Title:</span>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>

            <button type="submit">Add</button>

            {!error ? 
                <div className="error">
                    <p>{message}</p>
                </div>
            :
                <></>
            }
        </form>
    )
}