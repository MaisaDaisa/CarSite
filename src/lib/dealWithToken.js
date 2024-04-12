"use server";
import { cookies } from "next/headers";

export const saveToken = (response) => {
	if (response.error) {
		console.log(response.error_description, "error");
	} else {
		const timestamp = new Date().getTime();
		cookies().set("refresToken", response.refreshToken);
		cookies().set("expiresIn", response.expiresIn);
		cookies().set("timestamp", timestamp);
		cookies().set("localId", response.localId);
		cookies().set("idToken", response.idToken);
		cookies().set("kind", response.kind);
		cookies().set("email", response.email);
	}
};
