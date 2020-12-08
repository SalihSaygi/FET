// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUsers : ()=>{
        return fetch('/users')
                .then(res => res.json())

    },
    findOneUser : (_id)=>{
        return fetch(`/users/${_id}`)
                    .then(res => res.json())
    },
    deleteUser : (_id)=>{
        return fetch(`/users/${_id}`,
                    {method : 'delete'})
                    .then(res => res.json())
    },
    updateUser : (user)=>{
        return fetch(`/users/${user._id}`,
                    {method : "put",
                     body: JSON.stringify(user),
                     headers : {
                         "Content-Type" : "application/json"
                     }}).then(res => res.json())
    },
    createUser : (user)=>{
        return fetch(`/users/create`,
            {method : 'post',
            body: JSON.stringify(user),
            headers : {
                "Content-Type" : "application/json"
            }}).then(res => res.json())
    }
}