// import React, {Component} from 'react'
// import {DropzoneArea} from 'material-ui-dropzone'
 
// class DropzoneAreaExample extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       files: []
//     };
//   }
//   handleChange(files){
//     this.setState({
//       files: files
//     });
//   }
//   render(){
//     return (
//       <DropzoneArea
//         onChange={this.handleChange.bind(this)}
//         />
//     )
//   }
// }
 
// export default DropzoneAreaExample;
// DropzoneDialog

import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
 
export default class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/jpg', 'image/png', 'image/bmp', 
                                    'video/mp4', 'video/dng', 'video/tiff', 'video/3gp', 'video/jpeg', 'video/heif', 'video/mpeg-4', 'video/h.265', 'video/h.264', 'video/mov']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={3}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}