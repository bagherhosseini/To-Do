export default function RegisterFetch(name, username, password){
    return fetch('http://localhost:5050/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
        headers: {
        'Content-Type': 'application/json'
        }
    });
    
}