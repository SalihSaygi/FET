import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    title: {
        margin: 8,
        fullWidth: true
    }
  }));

export default function ReportPage() {

    const classes = useStyles()

    return (
        <>
            <form className={classes.root} autoComplete="off">
                <TextField
                id="standard-basic" 
                label="Title"
                style={{ margin: 8 }}
                placeholder="Title"
                helperText="Be Descriptive"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </form>
        </>
    )
}
