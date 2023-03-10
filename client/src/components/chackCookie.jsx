import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ChackCookie(){
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(location.state?.username);

    const authToken = Cookies.get('authToken');

    
    useEffect(() => {
        if (!authToken) {
            navigate("/");
            console.log('authToken not found')
            return;
        }

        const checkCookie = async () => {
            try {
                const res = await fetch('http://localhost:5050/checkCookie', {
                    method: 'POST',
                    body: JSON.stringify({ authToken }),
                    credentials:"include",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if(!res.ok){
                    navigate("/");
                    return;
                }
                
                navigate("/home");

            } catch (error) {
                console.log(error);
                navigate("/");
                return;
            } finally {
                setLoading(false);
            }
        }
        checkCookie();
    }, [authToken, loading, navigate, username]);

    return loading ? <div>Loading...</div> : null;
}