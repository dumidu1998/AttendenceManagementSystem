import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBm-NihMX1GRPZdZ92Q3QuqV3dDbMG1LPQ",
    authDomain: "faceatmgt.firebaseapp.com",
    projectId: "faceatmgt",
    storageBucket: "faceatmgt.appspot.com",
    messagingSenderId: "720990364550",
    appId: "1:720990364550:web:6003f82cf6c075ee54c207"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };