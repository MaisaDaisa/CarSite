import { auth } from "./firebase";
import {
	addDoc,
	getDocs,
	query,
	where,
	getDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { likesCollection } from "./firebase";

export async function likeFunc(postId) {
	if (!auth.currentUser) return;
	if (!postId) return;

	const isLiked = await checkLiked(postId);
	console.log(isLiked);

	if (!isLiked.isLiked) {
		await addDoc(likesCollection, {
			UserId: auth.currentUser.uid,
			likedPost: postId,
		});
	} else {
		try {
			await deleteDoc(doc(likesCollection, isLiked.doc.id));
			console.log("Post unliked and document deleted");
		} catch (error) {
			console.error("Error deleting document:", error);
		}
	}
}

export async function checkLiked(postId) {
	if (!auth.currentUser) return { isLiked: false, docId: null };

	const queryRef = query(
		likesCollection,
		where("likedPost", "==", postId),
		where("UserId", "==", auth.currentUser.uid)
	);

	try {
		const querySnapshot = await getDocs(queryRef);
		const likedDoc = querySnapshot.docs[0];

		if (likedDoc.exists()) {
			console.log(likedDoc.id);
			return { isLiked: true, doc: likedDoc };
		} else {
			return { isLiked: false, docId: null };
		}
	} catch (error) {
		console.error("Error checking liked:", error);
		return { isLiked: false, docId: null };
	}
}

export const getListOfLikes = async () => {
	if (!auth.currentUser) return [];
	const queryRef = query(
		likesCollection,
		where("UserId", "==", auth.currentUser.uid)
	);
	try {
		const querySnapshot = await getDocs(queryRef);
		return querySnapshot.docs.map((doc) => doc.data().likedPost);
	} catch (error) {
		console.error("Error fetching liked posts:", error);
		return [];
	}
};
