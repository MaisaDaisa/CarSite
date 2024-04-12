import React, { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ input = "", inputSetter }) => {
	const handleClear = () => {
		inputSetter("");
	};

	return (
		<Input
			startDecorator={<SearchIcon className="cursor-pointer" />}
			endDecorator={
				input.length > 0 && (
					<Button
						onClick={handleClear}
						variant="text"
						color="primary"
						disabled={!input}>
						Clear
					</Button>
				)
			}
			value={input}
			onChange={(e) => inputSetter(e.target.value)}
			className="font-semibold"
			sx={{
				"--Input-minHeight": "50px",
				"--Input-paddingInline": "15px",
				"--Input-radius": "60px",
			}}
		/>
	);
};

export default SearchBar;
