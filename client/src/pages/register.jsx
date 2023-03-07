import { useState } from "react";
import RegisterFetch from "../components/register";

export default function Register(){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('false');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await RegisterFetch(name ,username, password);
        const data = await response.json();
        setError(response.ok);
        setMessage(data);
        console.log(message);
    };

    return(
        <form className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="name">
                <span>name:</span>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
            </label>

            <label htmlFor="username">
                <span>Username:</span>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>

            <label htmlFor="password">
                <span>Password:</span>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <button type="submit">Registrera</button>

            <div className={error ? "success" : "error"}>
                <p>{message}</p>
            </div>
        </form>
    );
}