export default function GetFriendsFetch(){
    return fetch('http://localhost:5050/users/friends', {
        method: 'GET',
        credentials:"include",
        headers: {
        'Content-Type': 'application/json'
        }
    });
}