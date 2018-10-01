import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {loginUser} from '../actions/authActions'

import './Login.css'

import Field from '../components/Field'

class Login extends Component {
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

        this.props.loginUser(this.state.form)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const errors = this.state.errors

        return (
            <div className="Login">
                <form className="mg-card login-form" onSubmit={this.submit}>
                    <div display="flow" padding="32px" child-width="full" child-spacing="64px">
                        <div className="h2">Login</div>
                        <div display="flow" child-width="full" child-spacing="16px">
                            <label display="flow" child-width="full" child-spacing="8px">
                                <div>Email</div>
                                <Field type="email" placeholder="Your email" name="email"
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
                        </div>
                        <div display="row" child-width="half" child-spacing="16px">
                            <button type="reset" className="mg-button">Cancel</button>
                            <button type="submit" className="mg-button mg-primary">Log in</button>
                        </div>
                    </div>
                </form>
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

export default connect(mapStateToProps, {loginUser})(Login)
