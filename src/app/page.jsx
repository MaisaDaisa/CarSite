"use client";
import React from "react";
import DefaultLayout from "./layout/DefaultLayout";
import SplineBg from "@/components/SplineBg";
import SearchSection from "./layout/Sections/SearchSection";

export default function Home() {
	return (
		<div>
			<DefaultLayout>
				<div className="flex flex-col items-start h-screen min-h-[900px] justify-center gap-2 relative">
					<div className="relative left-24 top-32 z-10 text-wrap">
						<h1 className="text-6xl font-bold">Welcome To GeoAuto</h1>
						<p className="under-main-text text-2xl">Drive with Comfort</p>
					</div>
					<div className="w-full relative left-80 h-full">
						<SplineBg />
					</div>
				</div>
				<SearchSection></SearchSection>
			</DefaultLayout>
		</div>
	);
}
