// eslint-disable-next-line import/no-anonymous-default-export
export default { 
        getReports : () => {
            return fetch('/reports')
                    .then(res => res.json())
        },
        getOneReport: (_id) => {
            return fetch(`/reports?q=${encodeURIComponent(_id)}`,
                        { method : 'GET'}
                        .then(res => res.json))
        },
        deleteReport : (_id)=>{
            return fetch(`/reports?q=${encodeURIComponent(_id)}`,
                        {method : 'DELETE'})
                        .then(res => res.json())
        },
        updateReport : (report)=>{
            return fetch(`/reports?q=${encodeURIComponent(report._id)}`,
                        {method : "PUT",
                        body: JSON.stringify(report),
                        headers : {
                            "Content-Type" : "application/json"
                        }})
                        .then(res => res.json())
        },
        createReport : (report)=>{
            return fetch(`/reports/create`,
                {method : 'POST',
                body: JSON.stringify(report),
                headers : {
                    "Content-Type" : "application/json"
                }}).then(res => res.json())
        }
}