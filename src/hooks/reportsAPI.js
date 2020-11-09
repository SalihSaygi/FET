export default { 
        getReports : ()=>{
            return fetch('/reports')
                    .then(res => res.json())
        },
        deleteReport : (_id)=>{
            return fetch(`/reports/${_id}`,
                        {method : 'delete'})
                        .then(res => res.json())
        },
        updateReport : (report)=>{
            return fetch(`/reports/${report._id}`,
                        {method : "put",
                        body: JSON.stringify(report),
                        headers : {
                            "Content-Type" : "application/json"
                        }}).then(res => res.json())
        },
        createReport : (report)=>{
            return fetch(`/reports/create`,
                {method : 'post',
                body: JSON.stringify(report),
                headers : {
                    "Content-Type" : "application/json"
                }}).then(res => res.json())
        }
}