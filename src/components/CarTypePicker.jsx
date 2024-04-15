import React from "react";
import { carCategories } from "@/util/carCategories";
import DefaultAutoComplete from "./DefaultAutoComplete";

const CarTypePicker = ({ placeholder, id, setter, width }) => {
	return (
		<DefaultAutoComplete
			placeholder={placeholder}
			id={id}
			setter={setter}
			width={width}
			list={carCategories}
		/>
	);
};

export default CarTypePicker;
