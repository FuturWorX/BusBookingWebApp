import { initializeApp } from "firebase/app";
import config from "./config";

const firebaseConfig = {
  apiKey: "AIzaSyCTMAJpuUZ7Kr1FvmoJWbbHY2YW9x2kkD8",
  authDomain: "bus-booking-bee3e.firebaseapp.com",
  projectId: "bus-booking-bee3e",
  storageBucket: "bus-booking-bee3e.firebasestorage.app",
  messagingSenderId: "624385407537",
  appId: "1:624385407537:web:444c1e87fae9cbaf827310",
  measurementId: "G-12G6XS0W71",
};

const firebase = initializeApp(firebaseConfig);
export default firebase;
