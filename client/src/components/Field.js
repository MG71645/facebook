import React, {Component} from 'react'

class Field extends Component {
    state = {
        focus: false,
        value: '',
        tags: []
    }

    setValue = (value) => {
        if (this.props.onChange) {
            this.props.onChange({name: this.props.name, value})
        }
        if (this.props.value == null) {
            this.setState({value})
        }
    }

    handleInputChange = (event) => {
        this.setValue(event.target.value)
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
        if (this.props.type === 'tags' && this.input.innerHTML) this.addTag()
    }

    resetField = () => {
        this.setState({
            value: '',
            tags: []
        }, () => {
            this.input.innerHTML = ''
            this.props.onChange({name: this.props.name, value: ''})
        })
    }

    decrease = () => {
        const min = +this.props.min
        const max = +this.props.max
        const step = +this.props.step || 1
        this.setState((prevState) => {
            if (+prevState.value - step >= min) {
                if (+prevState.value <= max) {
                    return {value: +prevState.value - step}
                } else {
                    return {value: max}
                }
            } else {
                return {value: min}
            }
        }, () => {
            this.props.onChange({name: this.props.name, value: this.state.value})
        })
    }

    increase = () => {
        const min = +this.props.min
        const max = +this.props.max
        const step = +this.props.step || 1
        this.setState((prevState) => {
            if (+prevState.value >= min) {
                if (+prevState.value + step <= max) {
                    return {value: +prevState.value + step}
                } else {
                    return {value: max}
                }
            } else {
                return {value: min}
            }
        }, () => {
            this.props.onChange({name: this.props.name, value: this.state.value})
        })
    }

    addTag = () => {
        let tags = this.state.tags
        tags.push(this.input.innerHTML)
        this.input.innerHTML = ''

        if (this.props.onChange && this.props.value) {
            this.props.onChange({name: this.props.name, value: tags})
        } else {
            this.setState({tags})
        }
    }

    popTag = () => {
        let tags = this.state.tags
        tags.pop()

        if (this.props.onChange && this.props.value) {
            this.props.onChange({name: this.props.name, value: tags})
        } else {
            this.setState({tags})
        }
    }

    handleKeyPress = (event) => {
        if (event.key.match(/^(Enter| |,|;)$/)) {
            event.preventDefault()
            this.addTag()
        } else if (event.key.match(/^(Backspace)$/) && this.input.innerHTML === '') {
            event.preventDefault()
            this.popTag()
        }
    }

    handleTagClick = (index) => {
        this.setState((prevState) => {
            prevState.tags.splice(index, 1)
            return {tags: prevState.tags}
        }, () => {
            this.props.onChange({name: this.props.name, value: this.state.tags.join(',')})
        })
    }

    focusInput = () => {
        this.input.focus()
    }

    render() {
        return (
            <div className={this.props.className} element="field-container" state={this.state.focus ? 'focus' : null}
                 onClick={this.focusInput}
            >
                {this.state.value === '' && !this.state.tags.length ?
                    <div className={this.props.className} element="field-placeholder">{this.props.placeholder}</div>
                    :
                    <div className={this.props.className} element="field-button field-clear" onClick={this.resetField}/>
                }
                {this.props.type === 'tags' ?
                    <div className={this.props.className} element="field-tags">
                        {this.state.tags.map((tag, index) =>
                            <span className={this.props.className} element="field-tag" key={index}
                                 onClick={() => this.handleTagClick(index)}
                            >{tag}</span>
                        )}
                        <div contentEditable className={this.props.className} element="field-tags-input"
                             ref={input => this.input = input}
                             onKeyDown={this.handleKeyPress}
                             onFocus={this.handleInputFocus}
                             onBlur={this.handleInputBlur}
                        />
                    </div>
                :
                    <input className={this.props.className} element="field-input" ref={input => this.input = input}
                           type={this.props.type}
                           min={this.props.min}
                           max={this.props.max}
                           step={this.props.step}
                           value={this.props.value != null ? this.props.value : this.state.value}
                           onChange={this.handleInputChange}
                           onFocus={this.handleInputFocus}
                           onBlur={this.handleInputBlur}
                    />
                }
                {this.props.type === 'number' ? [
                    <div className={this.props.className} element="field-button field-decrease" key="decrease"
                         onMouseDown={this.decrease}
                    />,
                    <div className={this.props.className} element="field-button field-increase" key="increase"
                         onMouseDown={this.increase}
                    />
                ] : null }
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type === 'tags' && nextProps.value) {
            this.setState({tags: nextProps.value})
        }
    }
}

export default Field
