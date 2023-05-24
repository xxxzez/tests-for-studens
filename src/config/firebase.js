import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAcWZf_TgcSCxE3KVsKqVvlnyejtLDjxe8',
  authDomain: 'tests-for-students-198d3.firebaseapp.com',
  databaseURL:
    'https://tests-for-students-198d3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tests-for-students-198d3',
  storageBucket: 'tests-for-students-198d3.appspot.com',
  messagingSenderId: '832924229661',
  appId: '1:832924229661:web:f168d2d150b65b3322a6f4',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// ACTION--------------------------------------------------------------

// sign in
export const signInToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  )

// sign up
export const signUpToDatabase = (email, password) =>
  new Promise((resolve, reject) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error))
  )

// post
export const postDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .push(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  )

// set
export const setDataToDatabase = (path, data) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .set(data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  )

// get
export const getDataFromDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .on('value', (snapshot) =>
        snapshot.val()
          ? resolve(snapshot.val())
          : reject('data not found or database error')
      )
  )

// delete
export const deleteDataDatabase = (path) =>
  new Promise((resolve, reject) =>
    firebase
      .database()
      .ref(path)
      .remove()
      .then(() => resolve(true))
      .catch((e) => reject(e))
  )
