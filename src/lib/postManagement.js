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
import { or, and } from "firebase/firestore";

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
			price: priceNegotiation ? 0 : parseInt(price),
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

export async function getLikedPosts() {
	const likedPosts = await getListOfLikes();

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

export async function modularGetPosts(objectParam) {
	try {
		// PAGINATION
		let q = query(postsCollection, orderBy("datePosted", "desc"), limit(1));
		if (objectParam.lastItem !== null) {
			q = query(q, startAfter(objectParam.lastItem));
		}

		// SEARCH FILTER
		if (objectParam.searchText && objectParam.searchText.length > 2) {
			console.log("SearchText", objectParam.searchText);
			q = query(
				q,
				or(
					and(
						where("brand", ">=", objectParam.searchText),
						where("brand", "<=", objectParam.searchText + "\uf8ff")
					),
					and(
						where("model", ">=", objectParam.searchText),
						where("model", "<=", objectParam.searchText + "\uf8ff")
					)
				)
			);
		}

		// PRICE FILTER
		q = query(
			q,
			where("price", ">=", objectParam.minPrice ? objectParam.minPrice : 0)
		);
		if (objectParam.maxPrice) {
			console.log("MaxPrice", objectParam.maxPrice);
			q = query(q, where("price", "<=", objectParam.maxPrice));
		}

		// YEAR FILTER
		q = query(
			q,
			where("year", ">=", objectParam.minYear ? objectParam.minYear : 1900)
		);
		if (objectParam.maxYear) {
			console.log("MaxYear", objectParam.maxYear);
			q = query(q, where("year", "<=", objectParam.maxYear));
		}

		console.log("Query", q);
		const queryData = await getDocs(q);
		return queryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}
