export default function UpdateReqFetch(reqid){
    return fetch('http://localhost:5050/users', {
        method: "PUT",
        body: JSON.stringify({ reqid }),
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}