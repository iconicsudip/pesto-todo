// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATKPvHQC3CwONuGZDfNmVtdG_oHkj3Gms",
    authDomain: "track-list-4de35.firebaseapp.com",
    projectId: "track-list-4de35",
    storageBucket: "track-list-4de35.appspot.com",
    messagingSenderId: "564043943150",
    appId: "1:564043943150:web:891d2f05c64e5650da77ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();

export default app