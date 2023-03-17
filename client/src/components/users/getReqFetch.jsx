export default function GetReqFetch(){
    return fetch('http://localhost:5050/users/req', {
        method: 'GET',
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}