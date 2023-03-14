export default function EditTodo(title, todoid){
    return fetch('http://localhost:5050/todo', {
        method: "PUT",
        body: JSON.stringify({ title, todoid }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}