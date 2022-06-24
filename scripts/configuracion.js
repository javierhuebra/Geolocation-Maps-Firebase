

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "API-KEY",
    authDomain: "geo-location-prueba.firebaseapp.com",
    projectId: "geo-location-prueba",
    storageBucket: "geo-location-prueba.appspot.com",
    messagingSenderId: "457664302247",
    appId: "1:457664302247:web:0cc2f643d88c4c13329f82"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
