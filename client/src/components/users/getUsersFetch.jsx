export default function GetUsersFetch(){
    return fetch('http://localhost:5050/users', {
        method: 'GET',
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}