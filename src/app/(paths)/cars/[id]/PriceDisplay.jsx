import React from "react";
import Switch from "@mui/joy/Switch";
import { switchClasses } from "@mui/joy/Switch";

const PriceDisplay = ({ priceProp, currencyProp }) => {
	const [currency, setCurrency] = React.useState(currencyProp);
	const [price, setPrice] = React.useState(priceProp);

	return (
		<div className="flex flex-row w-full h-24px gap-10 items-center text-nowrap">
			<p class="flex items-center text-[28px] leading-[1] text-center text-gray-800 font-bold pr-[4px]">
				{price + " "}
				<span class="w-6">{{ lari: "₾", dollar: "$" }[currency]}</span>
			</p>
			<div class="flex flex-row items-center gap-2 font-bold text-lg">
				<Switch
					startDecorator={<p className="text-lg">₾</p>}
					endDecorator={<p className="text-lg">$</p>}
					onChange={() => setCurrency(currency === "lari" ? "dollar" : "lari")}
					sx={(theme) => ({
						[`& .${switchClasses.thumb}`]: {
							transition: "width 0.2s, left 0.2s",
						},
						[`&.${switchClasses.checked}`]: {
							"--Switch-trackBackground": "rgb(48 209 88)",
							"&:hover": {
								"--Switch-trackBackground": "rgb(48 209 88)",
							},
						},
					})}
				/>
			</div>
		</div>
	);
};

export default PriceDisplay;
