"use client";
import React, { use, useEffect, useState } from "react";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { MenuList, MenuItem } from "@mui/material/";
import { logout } from "@/lib/accountManagement";
import { useRouter } from "next/navigation";

const ProfilePicture = () => {
	const [profileImage, setProfileImage] = useState(defaultProfile);
	const [profileName, setProfileName] = useState("User");
	const [showMenu, setShowMenu] = useState(false);

	const navigation = useRouter();

	auth.onAuthStateChanged((user) => {
		if (user) {
			setProfileName(user.displayName);
		}
	});

	const handleLogout = () => {
		try {
			logout();
			navigation.push("/login");
		} catch (error) {
			console.log("error logging out");
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 relative">
			<div className="flex flex-row gap-2 items-center">
				<p className="text-lg font-semibold">
					{profileName ? profileName : "User"}
				</p>
				<Image
					src={profileImage}
					width={50}
					height={50}
					alt="ProfileImage"
					className="rounded-full cursor-pointer"
					onClick={() => setShowMenu(!showMenu)}
				/>
			</div>
			<MenuList
				className={`absolute top-16 -right-2 bg-white shadow-lg rounded-lg z-10 ${
					showMenu ? "" : "hidden"
				}`}>
				{/* <MenuItem className="cursor-pointer">Profile</MenuItem>
				<MenuItem className="cursor-pointer">My account</MenuItem> */}
				<MenuItem className="cursor-pointer" onClick={handleLogout}>
					Logout
				</MenuItem>
			</MenuList>
		</div>
	);
};

export default ProfilePicture;
