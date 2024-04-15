import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (image) => {
	try {
		const imageRef = ref(storage, `postImages/${uuidv4()}`);
		const uploadResult = await uploadBytes(imageRef, image);
		return getDownloadURL(uploadResult.ref);
	} catch (error) {
		console.error("Error uploading image: ", error);
		throw error;
	}
};
