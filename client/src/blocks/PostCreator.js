import React, {Component} from 'react'
import {connect} from 'react-redux'

// Actions
import {addPost} from '../actions/postActions'

// Styles
import './PostCreator.css'

// Components
import Textarea from '../components/Textarea'
import Uploader from '../components/Uploader'

class PostCreator extends Component{
    state = {
        key: '',
        text: '',
        errors: {}
    }

    handleFieldChange = field => {
        this.setState({text: field.value})
    }

    handleImageUploadSuccess = image => {
        this.setState({image: image.url})
    }

    submit = (e) => {
        e.preventDefault()

        this.props.addPost({
            text: this.state.text,
            image: this.state.image
        })

        this.setState({key: Date.now(), image: ''})
    }

    render() {
        return (
            <div className="PostCreator" key={this.state.key}>
                <form className="mg-card" onSubmit={this.submit}>
                    <div className="postcreator-body">
                        <Textarea className="postcreator-textarea" placeholder="Some text here..."
                                  onChange={this.handleFieldChange}
                        />
                        {this.state.image ?
                            <div className="postcreator-attachment">
                                <img src={this.state.image} width="100%" alt=""/>
                            </div>
                        : null}
                    </div>
                    <div className="postcreator-footer" display="row" horizontal-align="justify"
                         vertical-align="center">
                        <div className="postcreator-icons" display="row" child-spacing="8px">
                            <Uploader to="images/posts" onSuccess={this.handleImageUploadSuccess}>
                                <i className="material-icons md-18">add_photo_alternate</i>
                            </Uploader>
                            <i className="material-icons md-24">insert_emoticon</i>
                        </div>
                        <button type="submit" className="mg-button mg-primary postcreator-button">Send</button>
                    </div>
                </form>
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {addPost})(PostCreator)
