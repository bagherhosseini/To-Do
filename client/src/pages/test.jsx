import '../styles/style.scss';
import { useState } from "react";

export default function Home(){
    const [message, setMessage] = useState('');
    async function response(){
        try{
            const response = await fetch('http://localhost:5050/', {
                method: 'GET',
                credentials:"include",
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setMessage(data);
        }catch (error) {
            setMessage(error.message)
            return;
        }
    }

    response();
    
    return(
        <p>{message}</p>
    )
}