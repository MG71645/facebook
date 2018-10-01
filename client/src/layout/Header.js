import React, {Component, Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

// Actions
import {logoutUser} from '../actions/authActions'
import {clearCurrentProfile} from '../actions/profileActions'

// Components
import IfAuthorized from '../hoc/IfAuthorized'

class Header extends Component {
    logout = (e) => {
        e.preventDefault()

        this.props.clearCurrentProfile()
        this.props.logoutUser()
    }

    render() {
        const {isAuthenticated, user} = this.props.auth

        return (
            <div className="mg-header" display="row" vertical-align="center">
                <div className="mg-layout">
                    <div display="row" child-spacing="64px" vertical-align="center">
                        <div className="h3">Facebook</div>
                        <div display="row" width="fill" child-spacing="32px" horizontal-align="justify">
                            <div display="row" child-spacing="32px">
                                <NavLink to="/">Feed</NavLink>
                                {isAuthenticated ?
                                    <Fragment>
                                        <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
                                        <button onClick={this.logout}>Log out</button>
                                    </Fragment>
                                :
                                    <Fragment>
                                        <NavLink to="/register">Register</NavLink>
                                        <NavLink to="/login">Log in</NavLink>
                                    </Fragment>
                                }
                            </div>
                            <IfAuthorized>
                                <NavLink to={`/profile/${user.id}`}>{user.name}</NavLink>
                            </IfAuthorized>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Header)
