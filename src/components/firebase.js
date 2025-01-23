// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig1 = {
  apiKey: "AIzaSyDybVTujxxPfzDZmdTGiy8YcK6rOu5AY7w",
  authDomain: "metamask-5be84.firebaseapp.com",
  databaseURL: "https://metamask-5be84-default-rtdb.firebaseio.com",
  projectId: "metamask-5be84",
  storageBucket: "metamask-5be84.firebasestorage.app",
  messagingSenderId: "642361485140",
  appId: "1:642361485140:web:7fa1130f07d18fd2640ac1",
  measurementId: "G-P6TG5LT5B3"
};

const firebaseConfig = {
  apiKey: "AIzaSyAAWGW96HdIc0fo_FnzRv9Qs1jGW7MBJ4U",
  authDomain: "meta-8d13a.firebaseapp.com",
  databaseURL: "https://meta-8d13a-default-rtdb.firebaseio.com/",
  projectId: "meta-8d13a",
  storageBucket: "meta-8d13a.firebasestorage.app",
  messagingSenderId: "173737779727",
  appId: "1:173737779727:web:1b3e8993a715ace55eb97a",
  measurementId: "G-VEEVHBM8NP"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCvi7MhE_qgLgkgPr3JUT8BZXMYfGTwwso",
//   authDomain: "metamodal-20380.firebaseapp.com",
//   databaseURL: "https://metamodal-20380-default-rtdb.firebaseio.com",
//   projectId: "metamodal-20380",
//   storageBucket: "metamodal-20380.firebasestorage.app",
//   messagingSenderId: "442000129225",
//   appId: "1:442000129225:web:88715530d07ecca9106118",
//   measurementId: "G-XJWCJNEXTR"
// };

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
const database = getDatabase(cong);
export { database, ref, set, push, get };
export default cong;