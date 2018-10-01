import React, {Component} from 'react'

class Select extends Component {
    state = {
        value: '',
        content: ''
    }

    handleOptionClick = (tab) => {
        this.setState({
            value: tab.props.value,
            content: tab.props.children
        })
    }

    render() {
        return (
            <div className="mg-tabs">
                {this.props.children.map((tab, index) =>
                    <label key={index}
                        className="mg-tab"
                        onMouseDown={() => this.handleOptionClick(tab)}
                        state={tab.props.value === this.state.value ? 'selected' : null}
                    >
                        {tab.props.children}
                    </label>
                )}
            </div>
        )
    }
}

export default Select
