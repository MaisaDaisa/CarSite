"use client";
import React from "react";
import Image from "next/image";
import carLogoLandscape from "../../assets/carLogoLandscape.png";
import Link from "next/link";
import defaultProfile from "../../assets/defaultProfile.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/base";
import { useEffect } from "react";

const Header = ({ profileInfo }) => {
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
							<Link href="/about">About</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
				<div className="w-[140px] lg:flex flex-row justify-end shrink-0 hidden ">
					<Image
						src={defaultProfile}
						alt="profile"
						height={45}
						width={45}
						className="rounded-full"
					/>
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
				<nav className="">
					<ul className="flex flex-col items-center gap-10 text-lg font-semibold underline-offset-4 transition-all duration-300 ">
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/about">About</Link>
						</li>
						<li className="hover:underline hover:font-black transition-all ease-in-out duration-300">
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
