import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD_Rf1hK566AcZHWYzT4KgMWq7kmZTbGro",
    authDomain: "doxxer-53c36.firebaseapp.com",
    projectId: "doxxer-53c36",
    storageBucket: "doxxer-53c36.appspot.com",
    messagingSenderId: "842684182772",
    appId: "1:842684182772:web:44e907269e00bf54d3aea1",
    measurementId: "G-986C3WYBRC"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);
