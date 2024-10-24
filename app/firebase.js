import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB0ngfjiC9QLmoiEDBH0tVHxFXGChB5Z4w",
    authDomain: "esp8266-first-project-214.firebaseapp.com",
    databaseURL: "https://esp8266-first-project-214-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp8266-first-project-214",
    storageBucket: "esp8266-first-project-214.appspot.com",
    messagingSenderId: "674713211157",
    appId: "1:674713211157:web:abc7782cc2714a91f1591c"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };