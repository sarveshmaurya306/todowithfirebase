import firebase from "firebase";
import 'firebase/firestore';
import config from './config'

firebase.initializeApp(config);

const db = firebase.firestore()
db.settings({ timestampInSnapshots: true });

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export {db, auth, googleProvider};