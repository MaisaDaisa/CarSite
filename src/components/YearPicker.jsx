"use client";
import React from "react";
import Autocomplete from "@mui/joy/Autocomplete";

const YearPicker = ({ width, id, placeholder, setter, value = null }) => {
	const currentYear = new Date().getFullYear();
	const yearOptions = [...Array(currentYear - 1900 + 1).keys()].map(
		(index) => currentYear + 1 - index
	);
	return (
		<Autocomplete
			value={value}
			type="number"
			key={placeholder}
			placeholder={placeholder}
			id={id}
			onChange={(e, value) => setter(value)}
			options={yearOptions}
			getOptionLabel={(option) => option.toString()}
			sx={{
				width: width,
				"--Input-minHeight": "45px",
				"--Input-maxHeight": "45px",
				"--Input-paddingInline": "15px",
				"--Input-radius": "60px",
			}}
			renderInput={(params) => <TextField {...params} />}
		/>
	);
};

export default YearPicker;
