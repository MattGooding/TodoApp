import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfYXAvsptRsgvrPF6tUNT0DMCFrhXV2Gs",
    authDomain: "todo-app-5712f.firebaseapp.com",
    projectId: "todo-app-5712f",
    storageBucket: "todo-app-5712f.appspot.com",
    messagingSenderId: "37678211849",
    appId: "1:37678211849:web:1e1dd2a8442ad102fb29d8"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firestore };