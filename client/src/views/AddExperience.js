import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

// Actions
import {addExperience} from '../actions/profileActions'

// Styles
import './AddExperience.css'

// Components
import Field from '../components/Field'
import Textarea from '../components/Textarea'

class AddExperience extends Component {
    state = {
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

    submit = (e) => {
        e.preventDefault()

        this.props.addExperience(this.state.form, this.props.history)
    }

    render() {
        return (
            <div className="AddExperience" child-spacing="16px">
                <Link to="/dashboard" className="mg-button">Go Back</Link>
                <form className="mg-card experience-form" padding="32px" onSubmit={this.submit}>
                    <div display="column" child-width="full" child-spacing="64px">
                        <div className="h2">Add experience</div>
                        <div display="flow" child-width="full" child-spacing="16px">
                            <label display="column" child-width="full" child-spacing="8px">
                                <div>Title</div>
                                <Field className="mg-field" name="title"
                                       value={this.state.form.title}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                            <label display="column" child-width="full" child-spacing="8px">
                                <div>Company</div>
                                <Field className="mg-field" name="company"
                                       value={this.state.form.company}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                            <label display="column" child-width="full" child-spacing="8px">
                                <div>Location</div>
                                <Field className="mg-field" name="location"
                                       value={this.state.form.location}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                            <label display="column" width="half" child-width="full" child-spacing="8px">
                                <div>From</div>
                                <Field type="month" className="mg-field" name="from"
                                       value={this.state.form.from}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                            <label display="column" width="half" child-width="full" child-spacing="8px">
                                <div>To</div>
                                <Field type="month" className="mg-field" name="to"
                                       disabled={true}
                                       value={this.state.form.to}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                            <label display="column" child-width="full" child-spacing="8px">
                                <div>Description</div>
                                <Textarea className="mg-textarea" name="description" minrows={3}
                                       value={this.state.form.description}
                                       onChange={this.handleFieldChange}
                                />
                            </label>
                        </div>
                        <div display="row" child-spacing="16px" horizontal-align="right">
                            <Link to="/dashboard" className="mg-button">Cancel</Link>
                            <button onClick={this.submit} className="mg-button mg-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience))
