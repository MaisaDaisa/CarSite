import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Autocomplete from "@mui/joy/Autocomplete";
import TextField from "@mui/joy/TextField";
import CurrencyRangerInput from "@/components/PriceRangerInput";
import AutoListDisplay from "./AutoListDisplay";
import YearPicker from "@/components/YearPicker";

const SearchSection = () => {
	const [minYear, setMinYear] = React.useState(new Date().getFullYear() - 10);
	const [maxYear, setMaxYear] = React.useState(new Date().getFullYear());
	const [inputValue, setInputValue] = React.useState("");

	useEffect(() => {
		console.log("minYear", minYear);
		console.log("maxYear", maxYear);
	}, [minYear, maxYear]);

	return (
		<div className="flex lg:flex-row flex-col w-svw justify-start p-2  min-h-screen ">
			<div className="flex p-4 gap-8 flex-col lg:w-[300px] justify-start rounded-lg bg-secondary-gray ">
				<SearchBar input={inputValue} inputSetter={setInputValue} />
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
				<CurrencyRangerInput />
			</div>
			<AutoListDisplay />
		</div>
	);
};

export default SearchSection;
