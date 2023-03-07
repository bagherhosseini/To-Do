export default function LoginFetch(username, password){
    return fetch('http://localhost:5050/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
        'Content-Type': 'application/json'
        }
    });
}