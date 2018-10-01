import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {setCurrentUser, logoutUser} from '../actions/authActions'
import {clearCurrentProfile} from '../actions/profileActions'

// Styles
import './App.css'

// Routes
import Home from './Home'
import Registration from './Registration'
import Login from './Login'
import User from './User'
import Dashboard from './Dashboard'
import CreateProfile from './CreateProfile'
import EditProfile from './Profile'
import AddExperience from './AddExperience'

// Components
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import PrivateRoute from '../hoc/PrivateRoute'

// Check token
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        store.dispatch(clearCurrentProfile())
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
                        <div className="mg-layout">
                            <Switch>
                                <Route exact path="/register" component={Registration}/>
                                <Route exact path="/login" component={Login}/>
                                <PrivateRoute exact path="/profile/:id" component={User}/>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
