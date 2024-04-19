import { auth } from "./firebase";
import { deleteTokens, saveToken } from "./dealWithToken";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";

export async function createAccount(email, password, username) {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				saveToken(userCredential._tokenResponse);
				try {
					updateProfile(auth.currentUser, {
						displayName: username,
					});
				} catch (error) {
					reject(error);
				}
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function login(email, password) {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				saveToken(userCredential._tokenResponse);
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function logout() {
	return new Promise((resolve, reject) => {
		auth
			.signOut()
			.then(() => {
				deleteTokens();
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
}
