import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Moment from 'react-moment'

// Actions
import {deletePost, addLike, removeLike, addComment} from '../actions/postActions'

// Components
import IfOwner from '../hoc/IfOwner'
import Textarea from '../components/Textarea'
import Comment from '../blocks/Comment'

// Styles
import './Post.css'

class Post extends Component {
    state = {
        comments: false,
        textareaKey: ''
    }

    id = this.props.post._id

    delete = () => {
        this.props.deletePost(this.id)
    }

    isLiked = () => {
        if (this.props.post.likes.filter(like => like.user === this.props.auth.user.id).length) {
            return true
        }

        return false
    }

    toggleLike = () => {
        this.isLiked() ? this.props.removeLike(this.id) : this.props.addLike(this.id)
    }

    toggleComments = () => {
        this.setState(prevState => {
            return {comments: !prevState.comments}
        })
    }

    handleCommentInput = field => {
        this.setState({comment: field.value})
    }

    addComment = () => {
        this.props.addComment({
            id: this.id,
            comment: {
                user: this.props.auth.user.id,
                text: this.state.comment
            }
        })
        this.setState({textareaKey: Date.now(), comment: ''})
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.addComment()
        }
    }

    render() {
        const post = this.props.post

        return (
            <div className="mg-card post">
                <div display="column" child-width="full">
                    <div className="post-header" display="row" horizontal-align="justify">
                        <div display="row" child-spacing="16px" vertical-align="center">
                            <Link to={`/profile/${post.user._id}`}>
                                <div className="post-avatar" style={{backgroundImage: `url(${post.user.avatar})`}}/>
                            </Link>
                            <div>
                                <Link to={`/profile/${post.user._id}`} className="mg-bolder">{post.user.name}</Link>
                                <div><Moment fromNow>{post.date}</Moment></div>
                            </div>
                        </div>
                        <IfOwner user={post.user._id}>
                            <div onClick={this.delete}>Delete</div>
                        </IfOwner>
                    </div>
                    <div className="post-body" display="column" child-width="full" child-spacing="16px">
                        <div className="post-text" dangerouslySetInnerHTML={{__html: post.content.text}}/>
                        {post.content.image ?
                            <div className="post-image">
                                <img src={post.content.image} width="100%" alt=""/>
                            </div>
                        : null}
                    </div>
                    <div className="post-footer">
                        <div className="post-controls" display="row" child-spacing="8px">
                            <button className="mg-button post-control"
                                    state={this.isLiked() ? 'checked' : null}
                                    onClick={this.toggleLike}
                            >
                                <div display="row" child-spacing="8px" vertical-align="center">
                                    <i className="material-icons md-18">favorite</i>
                                    {post.likes.length ?
                                        <span>{post.likes.length}</span>
                                    : null}
                                </div>
                            </button>
                            {post.comments.length ?
                                <button className="mg-button" onClick={this.toggleComments}>
                                    <div display="row" child-spacing="8px" vertical-align="center">
                                        <i className="material-icons md-18">comment</i>
                                            <span>{post.comments.length}</span>
                                    </div>
                                </button>
                            : null}
                        </div>
                        {this.state.comments && post.comments.length ?
                            <div className="post-comments" child-spacing="16px">
                                {post.comments.map(comment =>
                                    <Comment comment={comment} post={this.id} key={comment._id}/>
                                )}
                            </div>
                        : null}
                        <div className="post-comment" onKeyPress={this.handleKeyPress}>
                            <Textarea className="comment-textarea" placeholder="Comment..." key={this.state.textareaKey}
                                      onChange={this.handleCommentInput}
                            />
                            {this.state.comment ?
                                <div display="row" horizontal-align="right">
                                    <button className="mg-button mg-primary comment-submit" onClick={this.addComment}>Send</button>
                                </div>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deletePost, addLike, removeLike, addComment})(Post)
