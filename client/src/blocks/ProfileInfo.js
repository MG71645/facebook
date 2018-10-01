import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios/index'

// Actions
import {updateUser} from '../actions/authActions'

// Components
import Uploader from '../components/Uploader'

// Styles
import './ProfileInfo.css'

class ProfileInfo extends Component {
    state = {
        name: '',
        email: '',
        avatar: ''
    }

    getUserInfo = () => {
        axios.get(`/api/users/${this.props.match.params.id}`)
            .then(res => this.setState({
                name: res.data.name,
                email: res.data.email,
                avatar: res.data.avatar
            }))
    }

    handleAvatarUploadSuccess = file => {
        this.props.updateUser({
            id: this.props.auth.user.id,
            avatar: file.url
        })
    }

    render() {
        const avatar =
            <div className="profile-avatar" width="full">
                <img width="100%" alt="" src={this.state.avatar ? this.state.avatar : 'https://innmind.com/assets/placeholders/no_avatar-3d6725770296b6a1cce653a203d8f85dcc5298945b71fa7360e3d9aa4a3fc054.svg'}/>
            </div>

        return (
            <div className="mg-card profile-info">
                <div display="column" child-width="full" child-spacing="16px">
                    {this.props.auth.user.id === this.props.match.params.id ?
                        <Uploader to="images/avatars" onSuccess={this.handleAvatarUploadSuccess}>{avatar}</Uploader>
                    : avatar}
                    <div>
                        <div className="h3">{this.state.name}</div>
                        <div>{this.state.email}</div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.getUserInfo()
    }

    componentDidUpdate() {
        if (this.props.auth.user.avatar !== this.state.avatar) this.getUserInfo()
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {updateUser})(withRouter(ProfileInfo))
