import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.SERVER_URL
})

interface Props {
    id: string
}
export const CommentsDIV = ({id}: Props) => {

    const privateReportEndpoint = `/pReports/${id}/comments`
    const requestEndPoint = "requests"
    const publicReportEndpoint = "pbreports"
    
    const prReport = api.get(privateReportEndpoint);
    const Request = api.get(requestEndPoint);
    const pbReport = api.get(publicReportEndpoint);
    
    Promise.all([prReport, Request, pbReport]).then(function(values) {
      console.log(values);
    })
    
    return (
        <div>
            
        </div>
    )
}
