import { useState } from "react";
import RegisterFetch from "../components/registerFetch";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('false');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await RegisterFetch(name ,username, password);
            const data = await response.json();
            setError(response.ok);
            if(response.ok){
                navigate("/");
            }
            setMessage(data);
            return;

        }catch (error) {
            setError(false);
            setMessage(error.message)
            return;
        }
    };

    return(
        <form className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="name">
                <span>name:</span>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
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