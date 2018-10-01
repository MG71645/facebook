import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Moment from 'react-moment'

// Actions
import {getCurrentProfile, deleteProfile, deleteExperience} from '../actions/profileActions'

// Styles
import './Dashboard.css'

class Dashboard extends Component {
    deleteExperience = (id) => {
        this.props.deleteExperience(id)
    }

    deleteProfile = () => {
        this.props.deleteProfile()
    }

    render() {
        const user = this.props.auth.user
        const {profile, loading} = this.props.profile
        let content

        if (profile === null || loading) {
            content = <div>Loading...</div>
        } else {
            if (Object.keys(profile).length > 0) {
                content = (
                    <div className="mg-card dashboard-profile" padding="32px">
                        <div display="column" child-width="full" child-spacing="16px">
                            <div className="h2">Welcome {user.name}</div>
                            <div display="row" horizontal-align="justify">
                                <div className="mg-group">
                                    <Link to="/edit-profile" className="mg-button">Edit Profile</Link>
                                    <Link to="/add-experience" className="mg-button">Add Experience</Link>
                                </div>
                                <button className="mg-button mg-danger" onClick={this.deleteProfile}>Delete Account</button>
                            </div>
                            {profile.experience.length ?
                                <div className="experience-list">
                                    <table className="experience-table">
                                        <thead className="mg-head">
                                        <tr className="mg-row">
                                            <th>Title</th>
                                            <th>Company</th>
                                            <th>Period</th>
                                            <th>Months</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {profile.experience.map(item =>
                                            <tr className="mg-row" key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.company}</td>
                                                <td>
                                                    <Moment format="MMMM YYYY">{item.from}</Moment>
                                                    <span> - </span>
                                                    {item.to ?
                                                        <Moment format="MMMM YYYY">{item.to}</Moment>
                                                        : 'Now'}
                                                </td>
                                                <td>
                                                    <Moment diff={item.from} unit="months">{item.to}</Moment>
                                                </td>
                                                <td text-align="right">
                                                    <button onClick={this.deleteExperience(item._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            : null}
                        </div>
                    </div>
                )
            } else {
                content = (
                    <div display="column" child-spacing="16px" horizontal-align="center" text-align="center">
                        <div className="h2">Welcome {user.name}</div>
                        <div>You have no profile</div>
                        <Link to="/create-profile" className="mg-button mg-primary">Create Profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="Dashboard">
                {content}
            </div>
        )
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getCurrentProfile()
        // } else {
        //     this.props.history.push('/login')
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         nextProps.getCurrentProfile()
    //     }
    // }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteProfile, deleteExperience})(Dashboard)
