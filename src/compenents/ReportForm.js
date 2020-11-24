import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import createReport from '../hooks/reportsAPI'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UploadForm from './ImageOrVideoUploadForm'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    title: {
        margin: 8,
        fullWidth: true
    },
    slider: {
      width: 300
    }
  }))

function valuetext(value) {
  return `$${value}`;
}

export default function ReportForm() {
  
  const classes = useStyles()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { post, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createReport(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

    return (
        <>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              { error ? <h3 className="error">{error}</h3> : null}
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
                ref={post}
                }}
                />
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">Animal Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={animalType}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <ListSubheader>Pet</ListSubheader>
                    <MenuItem value="Cat">Cat</MenuItem>
                    <MenuItem value="Dog">Dog</MenuItem>
                    <MenuItem value="Turtles">Turtles</MenuItem>
                    <ListSubheader>Wild</ListSubheader>
                    <MenuItem value="Bear">Bear</MenuItem>
                    <MenuItem value="Deer">Thirty</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="filled-basic" label="Race" variant="filled" ref={post}/>
                <Typography id="discrete-slider" gutterBottom>
                  Bounty
                </Typography>
                <Slider
                  defaultValue={20}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={5}
                  max={100}
                /><Typography id="discrete-slider" gutterBottom>
                  Danger (if wild, if not leave empty)
                </Typography>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
                <TextField
                  id="filled-multiline-static"
                  fullWidth
                  className={classes.formControl}
                  label="Explanation"
                  multiline
                  rows={5}
                  placeholder="I found a lost animal!"
                  variant="filled"
                />
                <UploadForm label="Upload"/>
                <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
            </form>
        </>
    )
}
