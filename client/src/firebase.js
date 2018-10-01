import firebase from 'firebase/app'
import storage from 'firebase/storage'

const key = require('./config/keys').firebaseKey

const config = {
    apiKey: key,
    authDomain: "mg-facebook.firebaseapp.com",
    databaseURL: "https://mg-facebook.firebaseio.com",
    projectId: "mg-facebook",
    storageBucket: "mg-facebook.appspot.com",
    messagingSenderId: "1073561891065"
}

firebase.initializeApp(config)

export {
    firebase,
    storage
}
