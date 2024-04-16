import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CurrencyRangerInput from "@/components/PriceRangerInput";
import AutoListDisplay from "./AutoListDisplay";
import YearPicker from "@/components/YearPicker";

const SearchSection = () => {
	const [loading, setLoading] = React.useState(true);
	const [minYear, setMinYear] = React.useState(0);
	const [maxYear, setMaxYear] = React.useState(0);
	const [currency, setCurrency] = React.useState("lari");
	const [minPrice, setMinPrice] = React.useState(0);
	const [maxPrice, setMaxPrice] = React.useState(0);
	const [searchParam, setSearchParam] = React.useState("");

	return (
		<div className="flex lg:flex-row flex-col w-svw justify-start p-2  min-h-screen ">
			<div className="flex p-4 gap-8 flex-col lg:w-[300px] justify-start rounded-lg bg-secondary-gray ">
				<SearchBar
					input={searchParam}
					inputSetter={setSearchParam}
					setLoader={setLoading}
				/>
				<div className="flex flex-row justify-start  gap-2">
					<YearPicker
						width="200px"
						id="min-year-picker"
						placeholder="Min Year"
						setter={setMinYear}
					/>
					<YearPicker
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
