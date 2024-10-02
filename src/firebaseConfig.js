import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyAWc7n4fjN0vf2-A7f04POao-aUQymr4yk",
    authDomain: "event-photo-app-c3314.firebaseapp.com",
    projectId: "event-photo-app-c3314",
    storageBucket: "event-photo-app-c3314.appspot.com",
    messagingSenderId: "715369903495",
    appId: "1:715369903495:web:f5c8780e6b49c7a4c8cf22",
    measurementId: "G-Y4ZB8FV5F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);  // Initialize Firebase Authentication


export { storage , auth};
