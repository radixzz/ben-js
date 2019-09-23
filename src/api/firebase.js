import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from '@/firebase.json';

const App = firebase.initializeApp(firebaseConfig);

export async function SignIn(scopes = []) {
  let result = null;
  if (!App.auth().currentUser) {
    const provider = new firebase.auth.GithubAuthProvider();
    scopes.forEach(scope => provider.addScope(scope));
    result = await firebase.auth().signInWithPopup(provider);
  }
  return result;
}

export async function SignOut() {
  await firebase.auth().signOut();
}

export async function GetCurrentUser() {
  return new Promise((resolve) => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      resolve(currentUser);
    } else {
      App.auth().onAuthStateChanged(resolve);
    }
  });
}
