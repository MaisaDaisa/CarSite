import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Autocomplete from "@mui/joy/Autocomplete";
import TextField from "@mui/joy/TextField";
import CurrencyRangerInput from "@/components/CurrencyRangerInput";
import AutoListDisplay from "./AutoListDisplay";

const SearchSection = () => {
	const [minYear, setMinYear] = React.useState(new Date().getFullYear() - 10);
	const [maxYear, setMaxYear] = React.useState(new Date().getFullYear());
	const [inputValue, setInputValue] = React.useState("");

	const currentYear = new Date().getFullYear();
	const yearOptions = [...Array(currentYear - 1900 + 1).keys()].map(
		(index) => currentYear + 1 - index
	);

	useEffect(() => {
		console.log("minYear", minYear);
		console.log("maxYear", maxYear);
	}, [minYear, maxYear]);

	const handleMinNum = (text) => {
		console.log(text);
		const numericValue = text.replace(/[^0-9]/g, "");
		setInputValue(numericValue);
	};
	return (
		<div className="flex lg:flex-row flex-col w-svw justify-start p-2  min-h-screen ">
			<div className="flex p-4 gap-8 flex-col lg:w-[300px] justify-start rounded-lg bg-secondary-gray ">
				<SearchBar input={inputValue} inputSetter={setInputValue} />
				<div className="flex flex-row justify-start  gap-2">
					<Autocomplete
						placeholder="Min Year"
						id="min-year-picker"
						onChange={(e, value) => setMinYear(value)}
						options={yearOptions}
						getOptionLabel={(option) => option.toString()}
						sx={{
							"--Input-minHeight": "45px",
							"--Input-paddingInline": "15px",
							"--Input-radius": "60px",
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
					<Autocomplete
						placeholder="Max Year"
						id="max-year-picker"
						options={yearOptions}
						onChange={(e, value) => setMaxYear(value)}
						getOptionLabel={(option) => option.toString()}
						sx={{
							"--Input-minHeight": "45px",
							"--Input-paddingInline": "15px",
							"--Input-radius": "60px",
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</div>
				<CurrencyRangerInput />
			</div>
			<AutoListDisplay />
		</div>
	);
};

export default SearchSection;
