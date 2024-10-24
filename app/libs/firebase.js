// lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBaACdrZ6XwbP6X689q7QsZVv_Kh5N5-jY",
    authDomain: "vit-chennai-hackathon.firebaseapp.com",
    databaseURL: "https://vit-chennai-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vit-chennai-hackathon",
    storageBucket: "vit-chennai-hackathon.appspot.com",
    messagingSenderId: "522935988222",
    appId: "1:522935988222:web:678f418c00efcc6da65aaf"
  };
  

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const database = getDatabase(app);

export { database };

