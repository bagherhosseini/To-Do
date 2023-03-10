export default function LoginFetch(username, password){
    return fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}