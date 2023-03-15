export default function GetTodo(){
    return fetch('http://localhost:5050/todo', {
        method: 'GET',
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}