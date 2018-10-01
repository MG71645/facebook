import axios from 'axios'
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS} from './types'

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

export const createProfile = (data, history) => dispatch => {
    axios.post('/api/profile', data)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const updateProfile = (data, history) => dispatch => {
    axios.post('/api/profile', data)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const deleteProfile = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete('/api/profile')
            .then(res => {
                console.log('123')
                clearCurrentProfile()
            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => {
            console.log(res)
            history.push('/dashboard')
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
