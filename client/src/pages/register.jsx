import { useState } from "react";
import RegisterFetch from "../components/auth/registerFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <form className="form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <label htmlFor="name" className="userInfoLabel">
                <span>name</span>
                <input type="text" id="name" className="userInfo" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
            </label>

            <label htmlFor="username" className="userInfoLabel">
                <span>Username</span>
                <input type="text" id="username" className="userInfo" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            </label>

            <label htmlFor="password" className="userInfoLabel">
                <span>Password</span>
                <input type="password" id="password" className="userInfo" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 3 charaters long"/>
            </label>

            <button type="submit">Sign Up</button>

            <Link className="linkTo" to="/">Sign in</Link>

            <div className={error ? "success" : "error"}>
                <p>{message}</p>
            </div>
        </form>
    );
}