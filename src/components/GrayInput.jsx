import React from "react";
import Input from "@mui/joy/Input";

const GrayInput = ({ placeholderProp }) => {
	return (
		<Input
			placeholder={placeholderProp}
			className="bg-input-bg shadow-lg"
			variant="plain"
			sx={{
				"--Input-minHeight": "60px",
				"--Input-paddingInline": "20px",
				"--Input-radius": "10px",
			}}></Input>
	);
};

export default GrayInput;
