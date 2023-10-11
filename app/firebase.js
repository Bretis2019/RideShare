import { getAuth} from "firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};


const app = getApps ().length ? getApp(): initializeApp (firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage(app);

export {app, auth, db, storage}