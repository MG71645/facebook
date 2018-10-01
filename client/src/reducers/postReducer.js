import {ADD_POST, DELETE_POST, POSTS_LOADING, GET_POSTS, RELOAD_POST} from '../actions/types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case RELOAD_POST: {
            const posts = state.posts
            const index = state.posts.map(post => post._id).indexOf(action.payload._id)
            posts[index] = action.payload
            return {
                ...state,
                posts
            }
        }
        default:
            return state
    }
}
