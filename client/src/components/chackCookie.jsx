import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ChackCookie(){
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const username = location.state?.username;
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            navigate("/register");
            return;
        }

        const res = fetch('http://localhost:5050/checkCookie', {
            method: 'POST',
            body: JSON.stringify({ username, authToken }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }, [navigate, location]);
}