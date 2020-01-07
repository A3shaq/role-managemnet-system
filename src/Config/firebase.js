import * as firebase from "firebase";
import Swal from "sweetalert2";

const firebaseConfig = {
  apiKey: "AIzaSyBPHcNful2eM0CtwXI7Mk-cHJ5iWheGCE0",
  authDomain: "role-management-system.firebaseapp.com",
  databaseURL: "https://role-management-system.firebaseio.com",
  projectId: "role-management-system",
  storageBucket: "role-management-system.appspot.com",
  messagingSenderId: "856696811551",
  appId: "1:856696811551:web:87125fd51fdd353d5de52a",
  measurementId: "G-CXED5YD6GS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(firebase.initializeApp(firebaseConfig));
// const admin = require("firebase-admin");

function signUpWithFirebase(userName, email, password, role) {
  console.log(role);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(snapshot => {
      console.log(snapshot);
      let usersObj = {
        email,
        password,
        userName,
        uid: snapshot.user.uid,
        userRole: role
      };
      firebase
        .database()
        .ref()
        .child(`users/${usersObj.uid}`)
        .set(usersObj);
    });
  console.log("signup");
  console.log(userName);
}

function signInWithFirebase(email, password, cb) {
  console.log(email, password, "signInWithFirebase");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user.user.uid);

      var userDa = firebase.auth().currentUser;

      firebase
        .database()
        .ref()
        .child(`users/${user.user.uid}`)
        .once("value")
        .then(currentUser => {
          let userRole = currentUser.val();
          cb(userRole);

          console.log("userRole", userRole);
          // console.log(user.user.userRole);
        })
        .catch(e => {
          console.log("user obj catch runing");
        });
    })
    .catch(e => {
      cb();
      // Swal.fire("Oops...", "Please signup first", "error");
    });

  console.log(email, "signInWithFirebase 51");
 
}



//signOut
  function logOut() {
 
    var response =  firebase.auth().signOut();

    setTimeout(() => {
      window.location.assign("/");
    }, 1000);

    console.log("loggout");
    return response;

  
}
//signOut





export default {
  signInWithFirebase,

  signUpWithFirebase,
  logOut
};
