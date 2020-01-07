// import firebase from "firebase";
import firebase from "./firebase";
function signOut() {
    console.log("signOut");
    firebase.logOut();
    localStorage.removeItem("userID");
  }

  export {signOut}