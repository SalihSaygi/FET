import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export default function ErrorPage() {

    const useStyles = makeStyles((theme) => ({
        background: {
            position: "relative",
            width: "100%",
            height: "100vh",
            background: "#010700a",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        rocket: {
            position: "relative",
            animation: "animate 0.2s ease infinite",
            '&::before': {
                content: '',
                display: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "10px",
                height: "200px",
                background: "linear-gradient(#00d0ff, transparent)"
            },
            '&::after': {
                content: '',
                position: "absolute",
                bottom: "-200px",
                left: "50px",
                transform: "translateX(-50%)",
                width: "10px",
                height: "200px",
                background: "linear-gradient(#00d0ff, transparent)",
                filter: "blur(20px)",
            },
        },
        "@keyframes wiggle": {
            "0%": {
                transform: "translateY(-2px)"
            },
            "50%:": {
                transform: "translateY(2px)"
            },
            "100%": {
                transform: "translateY(-2px)"
            }
        },


    }))

    const classes = useStyles()

    return (
        <div className={classes.background}>
            <img src='../sources/images/rocket.png'></img>
        </div>
    )
}

function stars() {
    let count = 50
    
}