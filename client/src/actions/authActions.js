import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {GET_ERRORS, SET_CURRENT_USER} from './types'

const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const token = res.data.token
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

const updateUser = user => dispatch => {
    axios.post(`/api/users/update/${user.id}`, {avatar: user.avatar})
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            })
        })
}

const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    setCurrentUser
}
