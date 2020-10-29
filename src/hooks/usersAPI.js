export default {
    getUsers : ()=>{
        return fetch('/users')
                .then(res => res.json())
                .then(data => user);
    },
    deleteUser : (_id)=>{
        return fetch(`/users/${_id}`,
                    {method : 'delete'})
                    .then(res => res.json())
                    .then(data => user);
    },
    updateUser : (user)=>{
        return fetch(`/users/${user._id}`,
                    {method : "put",
                     body: JSON.stringify(user),
                     headers : {
                         "Content-Type" : "application/json"
                     }}).then(res => res.json())
                        .then(data => user);
    },
    createUser : (user)=>{
        return fetch(`/users/create`,
            {method : 'post',
            body: JSON.stringify(user),
            headers : {
                "Content-Type" : "application/json"
            }}).then(res => res.json())
                .then(data => user);
    }
}