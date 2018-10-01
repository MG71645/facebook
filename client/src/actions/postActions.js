import axios from 'axios'

import {GET_POSTS, POSTS_LOADING, ADD_POST, DELETE_POST, RELOAD_POST, GET_ERRORS} from './types'

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}

export const getPosts = data => dispatch => {
    dispatch(setPostsLoading())
    axios.get('/api/posts', {headers: data})
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

export const addPost = data => dispatch => {
    axios.post('/api/posts', data)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch({
            type: RELOAD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch({
            type: RELOAD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const addComment = data => dispatch => {
    axios.post(`/api/posts/comment/${data.id}`, data.comment)
        .then(res => dispatch({
            type: RELOAD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const deleteComment = data => dispatch => {
    axios.delete(`/api/posts/comment/${data.postId}/${data.commentId}`)
        .then(res => dispatch({
            type: RELOAD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
