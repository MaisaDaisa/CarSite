"use client";
import React from "react";
import DefaultLayout from "@/app/pageLayout/DefaultLayout";
import SplineBg from "@/components/SplineBg";
import SearchSection from "@/app/pageLayout/Sections/SearchSection";
import Image from "next/image";
import mustang from "@/assets/mustang.svg";

export default function Home() {
	return (
		<div>
			<DefaultLayout>
				<div className="flex flex-col items-start md:h-screen min-h-[600px] md:min-h-[900px] pt-20 md:pt-0 md:justify-center gap-2 relative">
					<div className="md:relative md:left-24 md:top-20 lg:top-32 z-10 text-wrap pl-5">
						<h1 className="text-4xl lg:text-6xl font-bold">
							Welcome To GeoAuto
						</h1>
						<p className="under-main-text text-sm lg:text-2xl">
							Drive with Comfort
						</p>
					</div>
					<div className="w-full relative hidden md:block lg:translate-x-1/4 h-full -z-10">
						<SplineBg />
					</div>
					<div className="w-full flex md:hidden h-2/3 items-start pt-10 px-5 justify-center">
						<Image src={mustang} width={500} height={200} />
					</div>
				</div>
				<SearchSection></SearchSection>
			</DefaultLayout>
		</div>
	);
}
