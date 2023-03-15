import { useState } from "react";
import LoginFetch from "../components/auth/loginFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('false');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await LoginFetch(username, password);
            const data = await response.json();
            if(response.ok){
                navigate("/Home", { state: { username } });
            }
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
        <form className="form" onSubmit={handleSubmit}>

            <h1>Sign in</h1>

            <label htmlFor="username" className="userInfoLabel">
                <span>Username</span>
                <input type="text" id="username" className="userInfo" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            </label>

            <label htmlFor="password" className="userInfoLabel">
                <span>Password</span>
                <input type="password" id="password" className="userInfo" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 3 charaters long"/>
            </label>

            <button type="submit">Sign in</button>

            <Link className="linkTo" to="/register">Register</Link>
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