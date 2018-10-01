import React, {Component} from 'react'

class Toggle extends Component {
    state = {
        checked: false
    }

    toggle = () => {
        this.setState(prevState => {
            return {checked: !prevState.checked}
        })
    }

    render() {
        return (
            <div state={this.state.checked ? 'checked' : null}
                 onClick={this.toggle}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Toggle
