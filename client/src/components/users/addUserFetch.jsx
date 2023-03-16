export default function AddUsersFetch(usernameRec){
    return fetch('http://localhost:5050/users', {
        method: 'POST',
        credentials:"include",
        body: JSON.stringify({ usernameRec }),
        headers: {
        'Content-Type': 'application/json'
        }
    });
}