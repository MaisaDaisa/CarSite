"use client";
import { Inter } from "next/font/google";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			auth.onAuthStateChanged((user) => {
				if (!user && router.pathname !== "/login") {
					router.push("/login");
				}
			});
		};
		handleRouteChange();
	}, [router]);
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
