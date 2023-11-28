import firebase from 'firebase/compat/app';
// import 'firebase/firestore';

const FirebaseCredentials = {
  apiKey: 'AIzaSyCjrqW_sJiWSC03tIkTawoUYMBGnu6MN4k',
  authDomain: 'offer-zone-final.firebaseapp.com',
  databaseURL: 'https://offer-zone-final.firebaseio.com',
  projectId: 'offer-zone-final',
  storageBucket: 'offer-zone-final.appspot.com',
  messagingSenderId: '1070154786255',
  appId: '1:1070154786255:web:6994c96e748b7639fb5eba',
  measurementId: 'G-GZNE72X77G',
};

const FirebaseCredentialsProd = {
  apiKey: 'AIzaSyBFFLUyVDC2q5sR4xvfwOdJ1Gd-QJi-oNQ',
  authDomain: 'offerzone-deploy.firebaseapp.com',
  databaseURL: 'https://offerzone-deploy.firebaseio.com',
  projectId: 'offerzone-deploy',
  storageBucket: 'offerzone-deploy.appspot.com',
  messagingSenderId: '590059813791',
  appId: '1:590059813791:web:fe8385b9611f4a28ec5baa',
  measurementId: 'G-S1WZH0MGDB',
};
// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  process.env.NODE_ENV === 'production'
    ? firebase.initializeApp(FirebaseCredentialsProd)
    : firebase.initializeApp(FirebaseCredentials);
}

export default firebase;
