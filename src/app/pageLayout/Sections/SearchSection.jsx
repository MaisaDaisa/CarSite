"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CurrencyRangerInput from "@/components/PriceRangerInput";
import AutoListDisplay from "./AutoListDisplay";
import YearPicker from "@/components/YearPicker";
import { useSearchParams } from "next/navigation";

const SearchSection = () => {
	const searchParams = useSearchParams();
	const [cars, setCars] = useState([]);
	const [lastItem, setLastItem] = React.useState(null);
	const [loading, setLoading] = useState(true);
	const [minYear, setMinYear] = useState(
		parseInt(searchParams.get("minYear")) || null
	);
	const [maxYear, setMaxYear] = useState(
		parseInt(searchParams.get("maxYear")) || null
	);
	const [currency, setCurrency] = useState("lari");
	const [minPrice, setMinPrice] = useState(
		parseInt(searchParams.get("minPrice")) || null
	);
	const [maxPrice, setMaxPrice] = useState(
		parseInt(searchParams.get("maxPrice")) || null
	);
	const [searchParam, setSearchParam] = useState(
		searchParams.get("searchParam") || ""
	);

	const handleSearch = () => {
		const queryParams = new URLSearchParams();
		if (searchParam) queryParams.set("searchParam", searchParam);
		if (minYear && maxYear && minYear > maxYear) {
			queryParams.set("minYear", maxYear);
			queryParams.set("maxYear", minYear);
		} else {
			if (minYear) queryParams.set("minYear", minYear);
			if (maxYear) queryParams.set("maxYear", maxYear);
		}
		if (minPrice && maxPrice && minPrice > maxPrice) {
			queryParams.set("minPrice", maxPrice);
			queryParams.set("maxPrice", minPrice);
		} else {
			if (minPrice) queryParams.set("minPrice", minPrice);
			if (maxPrice) queryParams.set("maxPrice", maxPrice);
		}
		const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
		window.history.pushState(null, "", newUrl);
		console.log(minYear, maxYear, minPrice, maxPrice, searchParam);

		console.log("FETCHING");
		setCars([]);
		setLoading(true);
		setLastItem(null);
	};

	const handleClear = () => {
		setSearchParam("");
		setMinYear(null);
		setMaxYear(null);
		setMinPrice(null);
		setMaxPrice(null);
		setCurrency("lari");
		setLastItem(null);
		setCars([]);
		setLoading(true);
	};

	return (
		<div className="flex lg:flex-row flex-col w-svw justify-start p-2  min-h-screen ">
			<div className="flex p-4 gap-8 flex-col lg:w-[300px] justify-start rounded-lg bg-secondary-gray ">
				<SearchBar
					handleClearFunc={handleClear}
					input={searchParam}
					inputSetter={setSearchParam}
					handleSearch={handleSearch}
				/>
				<div className="flex flex-col justify-start  gap-2">
					<YearPicker
						value={minYear}
						width="200px"
						id="min-year-picker"
						placeholder="Min Year"
						setter={setMinYear}
					/>
					<YearPicker
						value={maxYear}
						width="200px"
						id="max-year-picker"
						placeholder="Max Year"
						setter={setMaxYear}
					/>
				</div>
				<CurrencyRangerInput
					currency={currency}
					setCurrency={setCurrency}
					maxPrice={maxPrice}
					setMaxPrice={setMaxPrice}
					setMinPrice={setMinPrice}
					minPrice={minPrice}
				/>
			</div>
			<AutoListDisplay
				limit={parseInt(searchParams.get("limit")) || null}
				cars={cars}
				setCars={setCars}
				lastItem={lastItem}
				setLastItem={setLastItem}
				maxPrice={maxPrice}
				maxYear={maxYear}
				minPrice={minPrice}
				minYear={minYear}
				searchParam={searchParam}
				loading={loading}
				setLoading={setLoading}
			/>
		</div>
	);
};

export default SearchSection;
