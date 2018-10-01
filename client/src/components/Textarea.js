import React, {Component} from 'react'

class Textarea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            focus: false,
            value: ''
        }
    }

    handleInputChange = () => {
        this.setState({value: this.input.innerHTML}, () => {
            if (this.props.onChange) {
                this.props.onChange({name: this.props.name, value: this.input.innerHTML})
            }
        })
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

    focusInput = () => {
        this.input.focus()

        // var el = ReactDOM.findDOMNode(this).childNodes[1]
        // console.log(el)
        // if (el.childNodes.length) {
        //     var range = document.createRange()
        //     var sel = window.getSelection()
        //
        //     range.setStart(el, 1)
        //     range.collapse(true)
        //     sel.removeAllRanges()
        //     sel.addRange(range)
        //     el.focus()
        // }
    }

    resetField = () => {
        this.setState({value: ''}, () => {
            this.input.innerHTML = ''
            this.focusInput()
        })
    }

    render() {
        return (
            <div className={this.props.className} element="textarea-container"
                 state={this.state.focus ? 'focus' : null}
                 onClick={this.focusInput}
            >
                {this.state.value === '' ?
                    <div className={this.props.className} element="textarea-placeholder">{this.props.placeholder}</div>
                    :
                    <div className={this.props.className} element="textarea-button textarea-clear" onClick={this.resetField}/>
                }
                <div contentEditable className={this.props.className} element="textarea-input"
                     ref={input => this.input = input}
                     onInput={this.handleInputChange}
                     onFocus={this.handleInputFocus}
                     onBlur={this.handleInputBlur}
                     style={{'--rows': this.props.rows, '--minrows': this.props.minrows, '--maxrows': this.props.maxrows}}
                />
            </div>
        )
    }
}

export default Textarea
