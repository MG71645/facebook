import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {registerUser} from '../actions/authActions'

import './Registration.css'

import Field from '../components/Field'

class Registration extends Component {
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

    submit = () => {
        this.props.registerUser(this.state.form, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const errors = this.state.errors

        return (
            <div className="Registration">
                <div className="mg-card registration-form">
                    <div display="flow" padding="32px" child-width="full" child-spacing="64px">
                        <div className="h2">Registration</div>
                        <div display="flow" child-width="full" child-spacing="16px">
                            <label display="flow" child-width="full" child-spacing="8px">
                                <div>Name</div>
                                <Field placeholder="Your name" name="name"
                                       className={classNames('mg-field', {'mg-danger': errors.name})}
                                       onChange={this.handleFieldChange}
                                />
                                {errors.name && <div>{errors.name}</div>}
                            </label>
                            <label display="flow" child-width="full" child-spacing="8px">
                                <div>Email</div>
                                <Field placeholder="Your email" name="email"
                                       className={classNames('mg-field', {'mg-danger': errors.email})}
                                       onChange={this.handleFieldChange}
                                />
                                {errors.email && <div>{errors.email}</div>}
                            </label>
                            <label display="flow" child-width="full" child-spacing="8px">
                                <div>Password</div>
                                <Field type="password" placeholder="Your password" name="password"
                                       className={classNames('mg-field', {'mg-danger': errors.password})}
                                       onChange={this.handleFieldChange}
                                />
                                {errors.password && <div>{errors.password}</div>}
                            </label>
                            <label display="flow" child-width="full" child-spacing="8px">
                                <div>Confirm password</div>
                                <Field type="password" placeholder="Enter password again" name="password2"
                                       className={classNames('mg-field', {'mg-danger': errors.password2})}
                                       onChange={this.handleFieldChange}
                                />
                                {errors.password2 && <div>{errors.password2}</div>}
                            </label>
                        </div>
                        <div display="row" child-width="half" child-spacing="16px">
                            <button className="mg-button">Cancel</button>
                            <button className="mg-button mg-primary" onClick={this.submit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Registration))
