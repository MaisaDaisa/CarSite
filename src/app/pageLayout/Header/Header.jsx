"use client";
import React from "react";
import Image from "next/image";
import carLogoLandscape from "../../../assets/carLogoLandscape.png";
import Link from "next/link";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import ProfilePicture from "./ProfilePicture";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/base";
import { useEffect } from "react";
import { logout } from "@/lib/accountManagement";

const Header = () => {
	const [menuOpen, setMenuOpen] = React.useState(false);

	useEffect(() => {
		const handleResize = () => {
			setMenuOpen(false);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<header className="flex flex-col">
			<div className="flex flex-row justify-between m-4 p-4 py-4 pb-6 border-b-2 border-main-gray">
				<Link href="/" className="shrink-0">
					<Image
						src={carLogoLandscape}
						alt="carLogo"
						height={45}
						width={140}
						className="shrink-0"
					/>
				</Link>
				<nav className="hidden lg:block">
					<ul className="flex flex-row gap-20 text-lg font-semibold underline-offset-4 ">
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/favorites">Your Favorites</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/post">Post Car</Link>
						</li>
					</ul>
				</nav>
				<div className=" lg:flex flex-row justify-end shrink-0 hidden ">
					<ProfilePicture />
				</div>
				<Button
					onClick={() => setMenuOpen(!menuOpen)}
					className="lg:hidden cursor-pointer">
					<MenuIcon className="cursor-pointer" />
				</Button>
			</div>
			<div
				className={`overflow-hidden transition-all mt-8 duration-300 lg:hidden ${
					menuOpen ? "h-auto" : "h-0"
				}`}>
				<nav className="min-h-[40dvh] flex justify-center pb-14 border-b-2 mx-8 border-main-black">
					<ul className="flex flex-col items-center gap-10 text-lg font-semibold underline-offset-4 transition-all duration-300 w-1/3">
						<li className="self-end">
							<LogoutIcon
								className="cursor-pointer "
								onClick={() => logout()}
							/>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/favorites">Your Favorites</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/post">Post Car</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
