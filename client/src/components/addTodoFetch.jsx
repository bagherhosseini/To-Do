export default function addTodoFetch(title){
    return fetch('http://localhost:5050/todo', {
        method: 'POST',
        body: JSON.stringify({ title }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}