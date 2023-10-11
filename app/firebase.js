import { getAuth} from "firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAd2qvhlA9vHSqZrd8KkpYIBWmlqciadVM",
    authDomain: "rideshare-570a7.firebaseapp.com",
    projectId: "rideshare-570a7",
    storageBucket: "rideshare-570a7.appspot.com",
    messagingSenderId: "129186436077",
    appId: "1:129186436077:web:4d9624ecd6e7b267528de4"
};


const app = getApps ().length ? getApp(): initializeApp (firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage(app);

export {app, auth, db, storage}