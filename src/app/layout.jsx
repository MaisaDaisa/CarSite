"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { StyledEngineProvider } from "@mui/material";
import "./globals.css";

export default function RootLayout({ children }) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log("User: AUTH FINISHES", user);
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
			setIsLoading(false); // Set loading state to false when auth state check finishes
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (!isLoading && !isAuthenticated && router.pathname !== "/login") {
			console.log("Redirecting to /login");
			router.push("/login");
		}
	}, [router, isAuthenticated, isLoading]);

	return (
		<html lang="en">
			<StyledEngineProvider injectFirst>
				<body>{children}</body>
			</StyledEngineProvider>
		</html>
	);
}
