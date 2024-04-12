// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDorau4UMqLiGWnTRZqhXQGmUtQmHILflY",
	authDomain: "geoauto-b2a5e.firebaseapp.com",
	projectId: "geoauto-b2a5e",
	storageBucket: "geoauto-b2a5e.appspot.com",
	messagingSenderId: "374750093585",
	appId: "1:374750093585:web:8c9f8e60d3e392922a6cb0",
	measurementId: "G-TH7JL118QQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
