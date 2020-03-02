/**
 *
 * Written by vlad on 09/01/19
 */

import Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDaQ0WJFpK5P5bbvEBz4yx2PAb9dxDs3B8",
  authDomain: "paypay-4f024.firebaseapp.com",
  databaseURL: "https://paypay-4f024.firebaseio.com",
  projectId: "paypay-4f024",
  storageBucket: "paypay-4f024.appspot.com",
  messagingSenderId: "1037775150618",
  appId: "1:1037775150618:web:852ccc5e291f48b1897ba3"
};

Firebase.initializeApp(config);

const Firestore = Firebase.firestore();

export  {Firestore};
