import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import TextField from "@mui/material/TextField";

const ModelPicker = ({ placeholder, id, setter, width, disabled, models }) => {
	const [selectedModel, setSelectedModel] = useState(null);

	// Reset selectedModel when models change
	useEffect(() => {
		setSelectedModel(null);
	}, [models]);

	return (
		<Autocomplete
			placeholder={placeholder}
			id={id}
			disabled={disabled}
			value={selectedModel}
			onChange={(e, value) => {
				setSelectedModel(value);
				setter(value);
			}}
			options={models}
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

export default ModelPicker;
