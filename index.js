import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpaosjxzE1-J9zpwIFmPzvvOGmNe_8OEc",
  authDomain: "treasurelens-eff7a.firebaseapp.com",
  databaseURL: "https://treasurelens-eff7a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "treasurelens-eff7a",
  storageBucket: "treasurelens-eff7a.appspot.com",
  messagingSenderId: "806364031684",
  appId: "1:806364031684:web:ad877ece613296f2993791",
  measurementId: "G-ZEY9S90KLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

AppRegistry.registerComponent(appName, () => App);
