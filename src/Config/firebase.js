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
  // .catch(function(error) {
  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
  // ...
}



async function logOut() {}

const assignQuizToUser = async (quizId, user) => {
  console.log(quizId);
  console.log(user);

  let userAssign = await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get();

  console.log(userAssign.data());

  let quizAssigned = userAssign.data().quizAssigned;

  console.log(quizAssigned);

  // quizAssigned = {
  //   [quizId]: quizId,
  //   quizTaken: false
  // };
  // console.log(quizAssigned);

  let isAlready = await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(quizAssigned => {
      return quizAssigned.data().quizAssigned;
    });

  console.log(isAlready);

  let keys = Object.keys(isAlready || {});
  console.log(keys);

  let key = keys.find(key => key == quizId);

  console.log(key);

  if (key == undefined) {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          quizAssigned: {
            [quizId]: {
              quizId,
              quizTaken: false,
              finalScore: null
            }
          }
        },
        { merge: true }
      );
    Swal.fire(
      "Quiz Assign Successfully",
      `${quizId} assign to ${user.userName}`,
      "success"
    );
  } else {
    Swal.fire("Oops..", "Quiz Already Assigned..", "error");
  }
};

const setQuizTaken = async id => {
  console.log(id);

  let userId = await firebase
    .firestore()
    .collection("currUser")
    .doc("uid")
    .get();
  userId = await userId.data().userId;
  console.log(userId);

  await firebase
    .firestore()
    .collection("quizId")
    .doc("quizId")
    .set({ quizId: id });

  let quizId = await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .get();

  console.log(quizId.data().quizAssigned[id]);
  let obj = quizId.data().quizAssigned;

  obj[id].quizTaken = true;

  console.log(obj);

  await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .set(
      {
        quizAssigned: {
          [id]: {
            quizTaken: true
          }
        }
      },
      { merge: true }
    );
};

export default {
  signInWithFirebase,

  signUpWithFirebase,
  logOut
};
