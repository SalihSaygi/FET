import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../sources/css/404.css'
const useStyles = makeStyles((theme) => ({
    background: {
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))

export default function ErrorPage() {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <h1 className="text">404</h1>
        </div>
    )
}

function stars() {
    let count = 50
    
}