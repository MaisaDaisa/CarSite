import React from "react";
import { fuelTypes } from "@/util/fuelTypes";
import DefaultAutoComplete from "./DefaultAutoComplete";

const FuelTypePicker = ({ placeholder, id, setter, width }) => {
	return (
		<DefaultAutoComplete
			placeholder={placeholder}
			id={id}
			setter={setter}
			width={width}
			list={fuelTypes}
		/>
	);
};

export default FuelTypePicker;
