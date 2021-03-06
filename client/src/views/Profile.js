import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

// Actions
import {updateProfile, getCurrentProfile} from '../actions/profileActions'

// Styles
import './Profile.css'

// Components
import Field from '../components/Field'
import Select from '../components/Select'
import Textarea from '../components/Textarea'

class Profile extends Component {
    state = {
        displaySocial: false,
        form: {},
        errors: {}
    }

    handleFieldChange = (field) => {
        this.setState({
            form: {
                ...this.state.form,
                [field.name]: field.value
            }
        })
    }

    toggleSocial = () => {
        this.setState(prevState => {
            return {displaySocial: !prevState.displaySocial}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.updateProfile(this.state.form, this.props.history)
    }

    render() {
        return (
            <div className="Profile">
                <div className="mg-card profile-form" padding="32px">
                    <form display="flow" child-width="full" child-spacing="64px" onSubmit={this.handleSubmit}>
                        <div className="h2">Edit profile</div>
                        <div display="column" child-width="full" child-spacing="32px">
                            <div display="column" child-width="full" child-spacing="16px">
                                <label child-spacing="8px">
                                    <div>Profile Handle</div>
                                    <Field type="text" name="handle" className="mg-field"
                                           value={this.state.form.handle}
                                           onChange={this.handleFieldChange}
                                    />
                                </label>
                                <label child-spacing="8px">
                                    <div>Professional Status</div>
                                    <Select name="status" className="mg-field"
                                            value={this.state.form.status}
                                            onChange={this.handleFieldChange}
                                    >
                                        <option text="Student" value="Student">Student</option>
                                        <option text="Junior" value="Junior">Junior</option>
                                        <option text="Middle" value="Middle">Middle</option>
                                        <option text="Senior" value="Senior">Senior</option>
                                    </Select>
                                </label>
                                <label child-spacing="8px">
                                    <div>Company</div>
                                    <Field type="text" name="company" className="mg-field"
                                           onChange={this.handleFieldChange}
                                    />
                                </label>
                                <label child-spacing="8px">
                                    <div>Website</div>
                                    <Field type="text" name="website" className="mg-field"
                                           onChange={this.handleFieldChange}
                                    />
                                </label>
                                <label child-spacing="8px">
                                    <div>Location</div>
                                    <Field type="text" name="location" className="mg-field"
                                           onChange={this.handleFieldChange}
                                    />
                                </label>
                                <label child-spacing="8px">
                                    <div>Skills</div>
                                    <Field type="tags" name="skills" className="mg-field"
                                           value={this.state.form.skills}
                                           onChange={this.handleFieldChange}
                                    />
                                </label>
                                <label child-spacing="8px">
                                    <div>Short Bio</div>
                                    <Textarea name="bio" className="mg-textarea" minrows="3"
                                              onChange={this.handleFieldChange}
                                    />
                                </label>
                            </div>
                            <button type="button" className="mg-button" onClick={this.toggleSocial}>
                                Add Social Network Links
                            </button>
                            {this.state.displaySocial ?
                                <div display="column" child-width="full" child-spacing="16px">
                                    <label child-spacing="8px">
                                        <div>Youtube</div>
                                        <Field type="text" name="youtube" className="mg-field"
                                               onChange={this.handleFieldChange}
                                        />
                                    </label>
                                    <label child-spacing="8px">
                                        <div>Facebook</div>
                                        <Field type="text" name="facebook" className="mg-field"
                                               onChange={this.handleFieldChange}
                                        />
                                    </label>
                                    <label child-spacing="8px">
                                        <div>Twitter</div>
                                        <Field type="text" name="twitter" className="mg-field"
                                               onChange={this.handleFieldChange}
                                        />
                                    </label>
                                    <label child-spacing="8px">
                                        <div>LinkedIn</div>
                                        <Field type="text" name="linkedin" className="mg-field"
                                               onChange={this.handleFieldChange}
                                        />
                                    </label>
                                    <label child-spacing="8px">
                                        <div>Instagram</div>
                                        <Field type="text" name="instagram" className="mg-field"
                                               onChange={this.handleFieldChange}
                                        />
                                    </label>
                                </div>
                                : null}
                        </div>
                        <div display="row" child-spacing="16px" horizontal-align="right">
                            <Link to="/dashboard" className="mg-button">Cancel</Link>
                            <button type="submit" className="mg-button mg-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }

        if (nextProps.profile.profile) {
            this.setState({
                form: {
                    ...this.state.form,
                    handle: nextProps.profile.profile.handle,
                    status: nextProps.profile.profile.status,
                    skills: nextProps.profile.profile.skills
                }
            })
        }
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {updateProfile, getCurrentProfile})(withRouter(Profile))
