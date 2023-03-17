export default function GetFriendTodoFetch(Friendusername){
    return fetch('http://localhost:5050/friend', {
        method: 'POST',
        body: JSON.stringify({ Friendusername }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}