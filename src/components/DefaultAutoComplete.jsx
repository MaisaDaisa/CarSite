import React from "react";
import Autocomplete from "@mui/joy/Autocomplete";

const DefaultAutoComplete = ({ placeholder, id, setter, width, list }) => {
	return (
		<Autocomplete
			placeholder={placeholder}
			id={id}
			onChange={(e, value) => setter(value)}
			options={list}
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

export default DefaultAutoComplete;
