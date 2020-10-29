export default { 
        getReports : ()=>{
            return fetch('/reports')
                    .then(res => res.json())
                    .then(data => reports);
        },
        deleteReport : (_id)=>{
            return fetch(`/reports/${_id}`,
                        {method : 'delete'})
                        .then(res => res.json())
                        .then(data => reports);
        },
        updateReport : (user)=>{
            return fetch(`/reports/${repots._id}`,
                        {method : "put",
                        body: JSON.stringify(user),
                        headers : {
                            "Content-Type" : "application/json"
                        }}).then(res => res.json())
                            .then(data => reports);
        },
        createReport : (report)=>{
            return fetch(`/reports/create`,
                {method : 'post',
                body: JSON.stringify(user),
                headers : {
                    "Content-Type" : "application/json"
                }}).then(res => res.json())
                    .then(data => reports);
        }
}