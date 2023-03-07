import { useState } from "react";
import LoginFetch from "../components/loginFetch";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('false');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await LoginFetch(username, password);
        const data = await response.json();
        setError(response.ok);
        await setMessage(data);
        console.log(message);
    };

    return(
        <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="username">
                <span>Username:</span>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>

            <label htmlFor="password">
                <span>Password:</span>
                <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <button type="submit">Login</button>

            {!error ? 
                <div className="error">
                    <p>{message}</p>
                </div>
            :
                <></>
            }
            
        </form>
    );
}