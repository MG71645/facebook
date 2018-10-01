import {connect} from 'react-redux'

const IfOwner = props => {
    if (props.auth.user.id === props.user) return props.children
    return null
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(IfOwner)
