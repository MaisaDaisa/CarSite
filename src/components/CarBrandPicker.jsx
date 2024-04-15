import React from "react";
import { allBrands } from "@/util/allBrands";
import Autocomplete from "@mui/joy/Autocomplete";

const CarBrandPicker = ({ placeholder, id, setter, width }) => {
	return (
		<Autocomplete
			placeholder={placeholder}
			id={id}
			onChange={(e, value) => setter(value)}
			options={allBrands}
			getOptionLabel={(option) => option.brand.toString()}
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

export default CarBrandPicker;
