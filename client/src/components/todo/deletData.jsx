export default function DeleteTodo(todoid){
    return fetch('http://localhost:5050/todo', {
        method: 'DELETE',
        body: JSON.stringify({ todoid }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}