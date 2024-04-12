import React from "react";
import Image from "next/image";
import carLogoLandscape from "../../assets/carLogoLandscape.png";
import Link from "next/link";
import defaultProfile from "../../assets/defaultProfile.jpg";
const Header = async ({ profileInfo }) => {
	return (
		<header className="flex flex-row justify-between items-center m-4 p-4 py-4 pb-6 border-b-2 border-main-gray">
			<Link href="/">
				<Image src={carLogoLandscape} alt="carLogo" height={45} />
			</Link>
			<nav>
				<ul className="flex flex-row gap-20	 text-lg font-semibold underline-offset-4 ">
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
			<div className="w-[140px] flex flex-row justify-end">
				<Image
					src={defaultProfile}
					alt="profile"
					height={45}
					width={45}
					className="rounded-full"
				/>
			</div>
		</header>
	);
};

export default Header;
