import { collection, addDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { uploadImage } from "./firebaseStorage";
import {
	getDocs,
	where,
	limit,
	orderBy,
	startAfter,
	query,
} from "firebase/firestore";
import { postsCollection } from "./firebase";
import { getListOfLikes } from "./favortiesManager";
import { doc } from "firebase/firestore";

export async function createPost(
	year,
	brand,
	model,
	price,
	carType,
	fuelType,
	currency,
	location,
	priceNegotiation,
	imageFile
) {
	if (!auth.currentUser) return;
	try {
		const imageUrl = await uploadImage(imageFile);
		await addDoc(postsCollection, {
			year: year,
			brand: brand,
			model: model,
			price: priceNegotiation ? 0 : price,
			carType: carType,
			fuelType: fuelType,
			currency: currency,
			location: location,
			priceNegotiation: priceNegotiation,
			imageUrl: imageUrl,
			datePosted: new Date(),
			author: {
				name: auth.currentUser.displayName,
				id: auth.currentUser.uid,
			},
		});
	} catch (error) {
		console.error("Error creating post:", error);
	}
}

export async function getPosts() {
	try {
		const q = query(
			postsCollection,
			orderBy("datePosted", "desc"),
			limit(limit)
		);
		const queryData = await getDocs(q);
		return queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getLikedPosts() {
	const likedPosts = await getListOfLikes();
	console.log("likedPosts", likedPosts);
	return await getPostsByDocIdList(likedPosts);
}

export async function getPostsByDocIdList(docIdList) {
	if (!docIdList || !Array.isArray(docIdList)) return [];
	try {
		const q = query(
			postsCollection,
			where("__name__", "in", docIdList),
			orderBy("datePosted", "desc")
		);
		console.log("q", q);
		const queryData = await getDocs(q);
		return queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getPostById(postId) {
	try {
		const docRef = await getDoc(doc(postsCollection, postId));
		return { ...docRef.data(), id: docRef.id };
	} catch (error) {
		console.error("Error fetching post:", error);
		return null;
	}
}
