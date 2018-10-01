import React, {Component} from 'react'
import {connect} from 'react-redux'

// Actions
import {getPosts} from '../actions/postActions'

// Components
import Post from './Post'

class Feed extends Component {
    render() {
        const {loading, posts} = this.props.post

        const content = loading ?
            <div>Loading...</div>
        : posts.map(post =>
            <Post key={post._id} post={post}/>
        )

        return (
            <div className="Feed" display="column" child-width="full" child-spacing="16px">
                {content}
            </div>
        )
    }

    componentDidMount() {
        this.props.user ? this.props.getPosts({user: this.props.user}) : this.props.getPosts()
    }
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Feed)
