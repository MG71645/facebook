import {connect} from 'react-redux'

const IfAuthorized = props => {
    if (props.auth) return props.children
    return null
}

export default connect(state => ({auth: state.auth.isAuthenticated}))(IfAuthorized)
