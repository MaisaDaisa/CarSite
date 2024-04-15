import { Input } from "@mui/joy";
import React from "react";

const DefaultInput = ({ placeholder, id, width }) => {
	return (
		<Input
			placeholder={placeholder}
			id="id"
			sx={{
				width: width,
				"--Input-maxHeight": "45px",
				"--Input-paddingInline": "15px",
				"--Input-radius": "60px",
			}}
		/>
	);
};

export default DefaultInput;
