import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Moment from 'react-moment'

// Actions
import {deleteComment} from '../actions/postActions'

// Components
import IfOwner from '../hoc/IfOwner'

class Comment extends Component {
    delete = () => {
        this.props.deleteComment({
            postId: this.props.post,
            commentId: this.props.comment._id
        })
    }

    render() {
        const comment = this.props.comment
        const avatar = comment.user.avatar || 'https://innmind.com/assets/placeholders/' +
            'no_avatar-3d6725770296b6a1cce653a203d8f85dcc5298945b71fa7360e3d9aa4a3fc054.svg'

        return (
            <div display="row" child-spacing="8px">
                <Link to={`/profile/${comment.user._id}`}>
                    <div className="mg-avatar" style={{backgroundImage: `url(${avatar})`}}/>
                </Link>
                <div width="fill" padding="4px">
                    <div display="row" child-spacing="8px">
                        <Link to={`/profile/${comment.user._id}`}>
                            <span className="mg-bolder">{comment.user.name}</span>
                        </Link>
                        <span className="mg-weaker">
                            <Moment fromNow>{comment.date}</Moment>
                        </span>
                    </div>
                    <div>{comment.text}</div>
                </div>
                <IfOwner user={comment.user._id}>
                    <div onClick={this.delete}>Delete</div>
                </IfOwner>
            </div>
        )
    }
}

export default connect(null, {deleteComment})(Comment)
