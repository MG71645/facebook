import React, {Component} from 'react'

class Select extends Component {
    state = {
        focus: false,
        value: '',
        content: ''
    }

    handleInputFocus = () => {
        this.setState({
            focus: true
        })
    }

    handleInputBlur = () => {
        this.setState({
            focus: false
        })
    }

    handleInputChange = () => {
        if (this.props.onChange) {
            this.props.onChange({name: this.props.name, value: ''})
        }
        if (this.props.value === null) {
            this.setState({
                value: '',
                content: ''
            })
        }
    }

    handleOptionClick = (option) => {
        this.input.value = ''
        if (this.props.onChange && this.props.value) {
            this.props.onChange({name: this.props.name, value: option.props.value})
        } else {
            this.setState({
                value: option.props.value,
                content: option.props.children
            })
        }
    }

    render() {
        return (
            <label className={this.props.className} element="field-container" state={this.state.focus ? 'focus' : null}>
                {!this.state.value && !this.state.input ?
                    <div className={this.props.className} element="field-placeholder">{this.props.placeholder}</div>
                : null}
                <input className={this.props.className} element="field-input"
                       ref={input => this.input = input}
                       onFocus={this.handleInputFocus}
                       onBlur={this.handleInputBlur}
                       onChange={this.handleInputChange}
                />
                <div className={this.props.className} element="field-input">
                    {this.state.content}
                </div>
                <div className={this.props.className} element="field-button field-arrow"/>
                <div className={this.props.className} element="field-options">
                    {this.props.children.map((option, index) =>
                        !this.state.input || option.props.text.toLowerCase().includes(this.state.input.toLowerCase()) ?
                            <div key={index} className={this.props.className} element="field-option"
                                onMouseDown={() => this.handleOptionClick(option)}
                                state={option.props.value === this.state.value ? 'selected' : null}
                            >
                                {option.props.children}
                            </div>
                        : null
                    )}
                </div>
            </label>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            let index = this.props.children.map(item => item.props.value).indexOf(nextProps.value)
            this.setState({
                value: this.props.children[index].props.value,
                content: this.props.children[index].props.children
            })
        }
    }
}

export default Select
