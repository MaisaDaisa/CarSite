import React from "react";
import { locations } from "@/util/locations";
import DefaultAutoComplete from "./DefaultAutoComplete";

const LocationPicker = ({ placeholder, id, setter, width }) => {
	return (
		<DefaultAutoComplete
			placeholder={placeholder}
			id={id}
			setter={setter}
			width={width}
			list={locations}
		/>
	);
};

export default LocationPicker;
