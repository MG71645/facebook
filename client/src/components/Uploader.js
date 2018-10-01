import React, {Component} from 'react'
import {firebase} from '../firebase'
import FileUploader from 'react-firebase-file-uploader'

class Uploader extends Component {
    handleUploadStart = () => {

    }

    handleUploadProgress = () => {

    }

    handleUploadSuccess = name => {
        firebase.storage().ref(this.props.to).child(name).getDownloadURL()
            .then(url => this.props.onSuccess({name, url}))
    }

    handleUploadError = () => {

    }

    render() {
        return (
            <label element="uploader-container">
                <FileUploader
                    accept="image/*"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage().ref(this.props.to)}
                    onUploadStart={this.handleUploadStart}
                    onProgress={this.handleUploadProgress}
                    onUploadSuccess={this.handleUploadSuccess}
                    onUploadError={this.handleUploadError}
                />
                {this.props.children}
            </label>
        )
    }
}

export default Uploader
