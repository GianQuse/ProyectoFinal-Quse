import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBErt5kTjzXDiwbR11l1JIpQ_MdFqzft3c",
  authDomain: "ecommerce-planeta.firebaseapp.com",
  projectId: "ecommerce-planeta",
  storageBucket: "ecommerce-planeta.firebasestorage.app",
  messagingSenderId: "238806523461",
  appId: "1:238806523461:web:b854259cd5ecf860d64d2c"
};


initializeApp(firebaseConfig);

export const createFirebaseApp = () => {
    initializeApp(firebaseConfig);
}